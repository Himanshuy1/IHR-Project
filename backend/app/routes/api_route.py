from fastapi import APIRouter
from app.logger.attack_logger import get_attack_stats
from collections import Counter

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

@router.get("/logs")
async def get_logs():
    return {"logs": get_attack_stats()}

@router.get("/stats")
async def get_summary_stats():
    logs = get_attack_stats()
    unique_ips = len(set(log.get("source_ip") for log in logs if log.get("source_ip")))
    
    # Calculate top protocols
    protocols = [log.get("protocol", "HTTP") for log in logs]
    proto_counts = Counter(protocols).most_common(5)
    
    # Calculate top countries
    countries = [log.get("country", "Unknown") for log in logs if log.get("country") != "Unknown"]
    country_counts = Counter(countries).most_common(5)

    return {
        "total_attacks": len(logs),
        "unique_ips": unique_ips,
        "top_protocols": [{"name": p[0], "count": p[1]} for p in proto_counts],
        "top_countries": [{"name": c[0], "count": c[1]} for c in country_counts]
    }

@router.get("/map-data")
async def get_map_data():
    logs = get_attack_stats()
    # Group by lat/lon to create map markers
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
