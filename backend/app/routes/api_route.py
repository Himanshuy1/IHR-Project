from fastapi import APIRouter
from app.logger.attack_logger import get_attack_stats
from collections import Counter
from datetime import datetime, timedelta

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

@router.get("/logs")
async def get_logs():
    return {"logs": get_attack_stats()}

@router.get("/incidents")
async def get_incidents():
    logs = get_attack_stats()
    incidents = []
    
    for i, log in enumerate(logs):
        severity = "High" if log.get("protocol") == "SSH" else "Medium" if log.get("protocol") == "FTP" else "Low"
        try:
            log_time = datetime.fromisoformat(log.get("timestamp", ""))
            formatted_time = log_time.strftime("%d/%m/%y [%H:%M]")
        except:
            formatted_time = log.get("timestamp", "")
            
        incident = {
            "id": str(i + 100000), 
            "type": f"Suspicious {log.get('protocol', 'Unknown')} Connection",
            "affects": f"{log.get('country', 'Unknown')} ({log.get('source_ip')})",
            "assignee": None,
            "status": "Open",
            "time": formatted_time,
            "severity": severity,
            "source_ip": log.get("source_ip")
        }
        incidents.append(incident)
    return {"incidents": incidents}

@router.get("/stats")
async def get_summary_stats():
    logs = get_attack_stats()
    unique_ips = len(set(log.get("source_ip") for log in logs if log.get("source_ip")))
    
    # severity counts
    severity_counts = {"High": 0, "Medium": 0, "Low": 0}
    for log in logs:
        sev = "High" if log.get("protocol") == "SSH" else "Medium" if log.get("protocol") == "FTP" else "Low"
        severity_counts[sev] += 1
        
    # network activity (last 7 days mapping)
    days = [(datetime.utcnow() - timedelta(days=i)).strftime('%a') for i in range(6, -1, -1)]
    activity_map = {day: {"name": day, "requests": 0, "transfers": 0, "app": 0} for day in days}
    
    for log in logs:
        try:
            log_time = datetime.fromisoformat(log.get("timestamp", ""))
            day_name = log_time.strftime('%a')
            if day_name in activity_map:
                activity_map[day_name]["requests"] += 1
                if log.get("protocol") == "FTP":
                    activity_map[day_name]["transfers"] += 1
                elif log.get("protocol") == "HTTP" or log.get("protocol") == "HTTPS":
                    activity_map[day_name]["app"] += 1
        except Exception:
            pass
            
    network_activity = list(activity_map.values())
    
    # vulnerable endpoints (pie chart)
    proto_counts = Counter([log.get("protocol", "Unknown") for log in logs]).most_common(4)
    vulnerable_endpoints = [{"name": f"{p[0]} Service", "value": p[1]} for p in proto_counts]
    if not vulnerable_endpoints:
        vulnerable_endpoints = [{"name": "No Data", "value": 1}]
        
    # risks assessment
    risks = []
    for log in logs[:4]:
        severity = "High" if log.get("protocol") == "SSH" else "Medium" if log.get("protocol") == "FTP" else "Low"
        risks.append({
            "issue": f"Unauthorized {log.get('protocol')} Access",
            "desc": f"Source IP {log.get('source_ip')} ({log.get('country', 'Unknown')})",
            "sev": severity
        })
    
    # top countries and protocols for generic stats
    protocols = [log.get("protocol", "HTTP") for log in logs]
    top_protocols = [{"name": p[0], "count": p[1]} for p in Counter(protocols).most_common(5)]
    
    countries = [log.get("country", "Unknown") for log in logs if log.get("country") != "Unknown"]
    top_countries = [{"name": c[0], "count": c[1]} for c in Counter(countries).most_common(5)]
    
    return {
        "total_attacks": len(logs),
        "unique_ips": unique_ips,
        "severity_counts": severity_counts,
        "network_activity": network_activity,
        "vulnerable_endpoints": vulnerable_endpoints,
        "risks_assessment": risks,
        "top_protocols": top_protocols,
        "top_countries": top_countries
    }

@router.get("/map-data")
async def get_map_data():
    logs = get_attack_stats()
    markers = {}
    for log in logs:
        lat = log.get("latitude")
        lon = log.get("longitude")
        if lat and lon and lat != 0.0 and lon != 0.0:
            key = f"{lat},{lon}"
            if key not in markers:
                markers[key] = {
                    "lat": lat,
                    "lon": lon,
                    "country": log.get("country"),
                    "city": log.get("city"),
                    "count": 1
                }
            else:
                markers[key]["count"] += 1
                
    return {"markers": list(markers.values())}
