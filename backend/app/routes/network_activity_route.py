from fastapi import APIRouter
from app.logger.attack_logger import get_attack_stats
from datetime import datetime

router = APIRouter()

@router.get("/api/dashboard/network-activity")
async def get_network_activity():
    logs = get_attack_stats()
    # Example: Each log should have timestamp, src_ip, dst_ip, action, status
    events = []
    for log in logs:
        events.append({
            "timestamp": log.get("timestamp", ""),
            "src_ip": log.get("source_ip", "-"),
            "dst_ip": log.get("dest_ip", "-"),
            "action": log.get("protocol", "Unknown"),
            "status": log.get("status", "Detected")
        })
    # For chart, group by minute/hour for demo
    chart = []
    time_map = {}
    for event in events:
        t = event["timestamp"][:16]  # YYYY-MM-DDTHH:MM
        if t not in time_map:
            time_map[t] = {"timestamp": t, "requests": 0, "transfers": 0, "src_ip": event["src_ip"], "dst_ip": event["dst_ip"], "action": event["action"], "status": event["status"]}
        time_map[t]["requests"] += 1
        if event["action"] == "FTP":
            time_map[t]["transfers"] += 1
    chart = list(time_map.values())
    return {"activity": chart[-50:] + events[-10:]}  # last 50 chart points + last 10 events
