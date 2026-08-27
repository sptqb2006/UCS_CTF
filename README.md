# USC_CTF - UCS-CLUBDAY 2026

Custom CTF platform for **UCS-CLUBDAY 2026** built with custom Cyber Green / Matrix terminal theme, optimized security configurations, and automated deployment setup.

## 🚀 Overview

- **Event:** UCS-CLUBDAY 2026
- **Schedule:** 08:00 28/08/2026 - 16:00 28/08/2026
- **Theme:** Cyber Green Matrix with Alphanumeric Rain Engine
- **Auth:** Streamlined Username & Password registration (no email required)

## 🛠️ Quick Start

### 1. Run Locally
```bash
# Install dependencies
pip install -r requirements.txt

# Run with Gunicorn (Production mode)
gunicorn 'wsgi:app' --workers 2 --worker-class gevent --bind 0.0.0.0:4000
```

### 2. Deploy on Render
This repository includes `render.yaml` for automated deployment to Render.com.

---
*Powered by UCS x CTFd*
