import json
from datetime import datetime
import sys
import os
import requests
from app.utils.alerts import send_alert

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from database.db_connection import get_db_connection

def get_geo_info(ip: str):
    if ip == "127.0.0.1" or ip.startswith("192.168.") or ip.startswith("10."):
        return {"country": "LocalNetwork", "city": "Local", "lat": 0.0, "lon": 0.0}
    
    try:
        response = requests.get(f"http://ip-api.com/json/{ip}?fields=status,country,city,lat,lon", timeout=3)
        data = response.json()
        if data.get("status") == "success":
            return {
                "country": data.get("country", "Unknown"),
                "city": data.get("city", "Unknown"),
                "lat": data.get("lat", 0.0),
                "lon": data.get("lon", 0.0)
            }
    except Exception as e:
        print(f"GeoIP Error: {e}")
        pass
    
    return {"country": "Unknown", "city": "Unknown", "lat": 0.0, "lon": 0.0}

def log_attack(protocol: str, source_ip: str, request_method: str, headers: dict, payload: str, attack_path: str):
    geo = get_geo_info(source_ip)
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO attack_logs (protocol, source_ip, timestamp, request_method, headers, payload, attack_path, country, city, latitude, longitude)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (protocol, source_ip, datetime.utcnow().isoformat(), request_method, json.dumps(headers), payload, attack_path, geo['country'], geo['city'], geo['lat'], geo['lon']))
        conn.commit()
        conn.close()
        
        # Trigger an alert asynchronously (ignoring for loopback attacks for demonstration, usually only external)
        send_alert(f"🚨 New Attack Detected via {protocol}! IP: {source_ip} ({geo['country']}, {geo['city']})")
        
    except Exception as e:
        print(f"Failed to log attack: {e}")

def get_attack_stats():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM attack_logs ORDER BY timestamp DESC')
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]
