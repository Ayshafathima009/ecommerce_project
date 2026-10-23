"""
SIEME DRIVE — Email Notification Service
Optional SMTP integration for order dispatches and dealer alerts.
Truthful status: Never claims emails have been sent unless connection succeeds.
"""

import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_dispatch_notification(recipient_email, order_id, tracking_number):
    smtp_host = os.getenv('SMTP_HOST')
    smtp_port = int(os.getenv('SMTP_PORT', 587))
    smtp_user = os.getenv('SMTP_USER')
    smtp_password = os.getenv('SMTP_PASSWORD')
    from_email = os.getenv('SMTP_FROM_EMAIL', 'no-reply@merai.sieme.in')

    if not smtp_host or not smtp_user or not smtp_password:
        # Transparent reporting: Do not claim emails have been sent
        return {
            "status": "simulated",
            "message": f"SMTP credentials not configured. Dispatch alert for {order_id} simulated in dev mode.",
            "recipient": recipient_email
        }

    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"MERAI SIEME Order {order_id} Dispatched"
        msg['From'] = from_email
        msg['To'] = recipient_email

        body = f"""
        Dear Customer,

        Your Driver.MERAI automotive display order ({order_id}) has been packed and handed over to our express logistics partner.

        Tracking Number: {tracking_number}
        Official Webstore: https://merai.sieme.in

        SIEME DRIVE presenting MERAI — Engineered to Inspire.
        """
        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.sendmail(from_email, recipient_email, msg.as_string())

        return {
            "status": "sent",
            "message": f"Real email dispatched via {smtp_host}",
            "recipient": recipient_email
        }
    except Exception as e:
        return {
            "status": "failed",
            "error": str(e),
            "recipient": recipient_email
        }
