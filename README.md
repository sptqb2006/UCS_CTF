# USC_CTF - USTH CLUBDAY 2026

Custom CTF platform for **UCS-CLUBDAY 2026** using CTFd platform.

## Overview

- **Event:** UCS-CLUBDAY 2026
- **Schedule:** 08:00 28/08/2026 - 16:00 28/08/2026

## Quick Start

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
