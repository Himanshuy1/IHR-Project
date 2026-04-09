import smtplib
from email.mime.text import MIMEText
import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

# Email Config
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_EMAIL = os.getenv("SMTP_EMAIL", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
ALERT_TO_EMAIL = os.getenv("ALERT_TO_EMAIL", "")

# Twilio WhatsApp Config
TWILIO_SID = os.getenv("TWILIO_SID", "")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "")
TWILIO_FROM_WHATSAPP = os.getenv("TWILIO_FROM_WHATSAPP", "")
ALERT_TO_WHATSAPP = os.getenv("ALERT_TO_WHATSAPP", "")

def send_alert(message: str):
    print(f"[ALERT] {message}")
    send_email_alert(message)
    send_whatsapp_alert(message)

def send_email_alert(message: str):
    if not SMTP_EMAIL or not SMTP_PASSWORD or not ALERT_TO_EMAIL:
        return
        
    try:
        msg = MIMEText(message)
        msg['Subject'] = 'Honeypot Attack Notification'
        msg['From'] = SMTP_EMAIL
        msg['To'] = ALERT_TO_EMAIL
        
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_EMAIL, SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
    except Exception as e:
        print(f"Failed to send email alert: {e}")

def send_whatsapp_alert(message: str):
    if not TWILIO_SID or not TWILIO_AUTH_TOKEN or not TWILIO_FROM_WHATSAPP or not ALERT_TO_WHATSAPP:
        return
        
    try:
        client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN)
        # Twilio requires the 'whatsapp:' prefix
        from_number = TWILIO_FROM_WHATSAPP if TWILIO_FROM_WHATSAPP.startswith('whatsapp:') else f"whatsapp:{TWILIO_FROM_WHATSAPP}"
        to_number = ALERT_TO_WHATSAPP if ALERT_TO_WHATSAPP.startswith('whatsapp:') else f"whatsapp:{ALERT_TO_WHATSAPP}"
        
        client.messages.create(
            body=message,
            from_=from_number,
            to=to_number
        )
    except Exception as e:
        print(f"Failed to send WhatsApp alert: {e}")
