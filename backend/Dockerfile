FROM python:3.10-slim

WORKDIR /app

# Install necessary system dependencies for building some Python packages (e.g. paramiko cryptography)
RUN apt-get update && apt-get install -y gcc libssl-dev libffi-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Initialize Database before run
RUN python database/db_connection.py

# Expose ports
# HTTP
EXPOSE 8000
# HTTPS (if certs added)
EXPOSE 443
# SSH Honeypot
EXPOSE 2222
# FTP Honeypot
EXPOSE 2121

CMD ["python", "run.py"]
