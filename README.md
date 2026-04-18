<div align="center">
  <img src="docs/banner.png" alt="SecureShield Banner" width="100%">
</div>

# 🛡️ SecureShield
### *The Next-Generation Honeypot & Threat Intelligence System*

> [!CAUTION]
> ### 🛑 PROPRIETARY & CONFIDENTIAL
>
> This repository is for **demonstration and portfolio viewing purposes only**. The source code, assets, and documentation are the exclusive property of [Himanshu](https://github.com/Himanshuy1).
>
> We kindly request that you refrain from cloning, downloading, modifying, or reusing this code for personal, commercial, or educational projects without express written permission. By viewing this repository, you agree to the terms listed in the [LICENSE](./LICENSE).

---

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.95+-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB.svg)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED.svg)](https://www.docker.com/)

SecureShield is a sophisticated security framework designed to deceive, detect, and analyze unauthorized access attempts in real-time. By deploying deceptive "honeypot" services and visualizing attack vectors on a high-density, glassmorphic dashboard, SecureShield provides administrators with unparalleled situational awareness.

---

## ✨ Key Features

- **🌐 Multi-Protocol Deception**: Simultaneously simulates vulnerable **SSH** (Paramiko-powered) and **FTP** (pyftpdlib-powered) services to capture brute-force attempts and payload data.
- **📊 Intelligence Dashboard**: A premium, real-time interface built with **React** and **Tailwind CSS**, featuring dark mode and glassmorphic UI elements.
- **🗺️ Global Threat Mapping**: Interactive geographic visualization of attack origins using **Lat/Long** geolocation data.
- **📱 Instant Alerts**: Automated high-severity notifications delivered via **WhatsApp (Twilio)** and **SMTP Email**.
- **📈 Data Visualization**: Comprehensive charts and graphs (via **Recharts**) analyzing attack frequency, protocol distribution, and top threat regions.
- **🐳 Dockerized Architecture**: Fully containerized environment ensuring that the host machine remains isolated and secure during active breach attempts.

---

## 🚀 Tech Stack

### Backend (Honeypot Infrastructure)
- **FastAPI**: Asynchronous high-performance REST API.
- **Paramiko**: Custom SSH server simulation.
- **pyftpdlib**: Asynchronous FTP server framework.
- **Uvicorn**: ASGI server implementation.

### Frontend (Real-time Dashboard)
- **React + Vite**: For a lightning-fast development and user experience.
- **Tailwind CSS**: Utility-first styling for a sleek, modern aesthetic.
- **react-simple-maps**: Dynamic geographic plotting.
- **Zustand**: Lightweight and scalable state management.

### Deployment & Security
- **Docker / Docker Compose**: Container orchestration and host isolation.
- **Twilio API**: Cloud-based alerting system.
- **OpenSSL**: Secure SSL/TLS communication.

---

## 🛠️ Getting Started

### Prerequisites
- **Docker & Docker Compose** (Recommended)
- **Python 3.9+** (For local backend development)
- **Node.js 18+** (For local frontend development)

### Quick Start with Docker
The easiest way to get SecureShield running is using Docker:

```bash
# Clone the repository
git clone https://github.com/Himanshuy1/IHR-Project.git
cd SecureShield

# Launch the entire stack
docker-compose up --build
```

### Local Development Setup

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

#### Frontend
```bash
cd frontend-dashboard/frontend-dashboard
npm install
npm run dev
```

---

## ⚙️ Configuration
Configure your credentials in the `.env` file within the `backend/` directory:

| Variable | Description |
| :--- | :--- |
| `TWILIO_SID` | Your Twilio Account SID |
| `TWILIO_AUTH_TOKEN` | Your Twilio Auth Token |
| `SMTP_EMAIL` | Sender Email Address |
| `SMTP_PASSWORD` | App Password for SMTP |
| `ALERT_TO_EMAIL` | Notification Recipient Email |

---

## 📸 Screenshots

| Dashboard Overview | Threat Intelligence |
| :---: | :---: |
| ![Dashboard](docs/screenshots/dashboard_placeholder.png) | ![Map](docs/screenshots/map_placeholder.png) |

*(Add your actual screenshots to `docs/screenshots/` to replace these placeholders)*

---

## 🛡️ Disclaimer
**SecureShield** is intended for educational and defensive research purposes only. Do not deploy this system on production networks without proper security measures and legal authorization. The authors are not responsible for any misuse or damage caused by this software.

## 📄 License
Distributed under the **MIT License**. See `LICENSE` for more information.

---
<div align="center">
  Developed with ❤️ for the Cybersecurity Community
</div>
