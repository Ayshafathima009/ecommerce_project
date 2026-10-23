# MERAI SIEME — Engineered to Inspire
### Official Flagship E-Commerce Platform for Automotive Technology & Cockpit Systems
**Target Domain:** `merai.sieme.in`  
**Brand:** SIEME DRIVE presenting MERAI  

---

## 1. Project Overview

MERAI SIEME delivers a premium digital retail experience modeled on high-performance automotive standards. It brings together the seamless shopping experience of Amazon and Flipkart with a bespoke, dark-slate and electric-blue automotive visual design language.

### Core Catalogue
- **Active Flagship Product:**  
  **MERAI Daiichi Edition Car Display** (Display Label: *Driver.MERAI*)  
  - Specifications: 10.1" 2K IPS Screen (1920×1200), 4GB LPDDR4 RAM, 64GB Flash ROM, Android 13 Automotive OS, Wireless Apple CarPlay & Android Auto, 48-Band DSP Hi-Fi Audio, CANBUS OBD-II Telemetry.  
  - Price: ₹10,000 (M.R.P. ₹14,999)  
  - Initial Stock: 200 units  
  - Status: Available with 1-click Add to Cart and Buy Now  

- **Upcoming Electronic Innovations (Inactive Preview):**  
  - **MERAI AirPods** — ₹20,000 (Out of Stock, Stock: 0)  
  - **MERAI Smart Watch** — ₹30,000 (Out of Stock, Stock: 0)  
  - **MERAI AI Robot** — ₹15,000 (Out of Stock, Stock: 0)  
  *(Administrators can restock, adjust pricing, and activate products at any time via the Admin Command Center).*

---

## 2. Architecture & Tech Stack

```
merai-sieme/
├── client/ (or root Vite SPA)
│   ├── public/
│   │   └── logo/ (merai-logo.svg)
│   ├── src/
│   │   ├── assets/ (Generated 8k photography)
│   │   ├── components/ (Header, SearchModal, CartDrawer, Footer, Toast)
│   │   ├── context/ (StoreContext with multi-language & safe stock deduction)
│   │   ├── data/ (Initial seed catalogue, multi-language dictionaries)
│   │   ├── pages/ (Home, Products, PDP with 2-5s auto-gallery, Cart, Checkout, Confirmation, Account, My Orders, Admin, Distributor, About, Contact, Legal)
│   │   └── types/
├── server/
│   ├── app.py (Flask application entrypoint)
│   ├── requirements.txt (Python dependencies)
│   ├── schema.sql (PostgreSQL database schema & triggers)
│   ├── .env.example (Environment variables)
│   ├── routes/ (Auth, Products, Orders, Admin, Distributor)
│   └── services/ (Email notification relay, inventory safeguards)
└── README.md
```

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS 4, Lucide Icons.
- **Backend:** Python 3.10+ Flask REST API, CORS, SQLAlchemy, PyJWT, Bcrypt.
- **Database:** PostgreSQL with constraints, check limits, and indexes.
- **Multi-Language Engine:** English, Hindi (हिंदी), Tamil (தமிழ்), Malayalam (മലയാളം), and Arabic (العربية with complete RTL support).

---

## 3. Quickstart & Local Execution

### A. Run Frontend (React + Vite)
```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
# The application runs on http://localhost:3000
```

### B. Run Backend (Python Flask REST API)
```bash
# 1. Enter server directory
cd server

# 2. Create virtual environment
python3 -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Copy environment configuration
cp .env.example .env

# 5. Start Flask development server
python app.py
# The REST API runs on http://localhost:5000
```

---

## 4. PostgreSQL Database Setup

If you have a local or hosted PostgreSQL instance:

1. Create the database and user:
   ```sql
   CREATE USER merai_user WITH ENCRYPTED PASSWORD 'your_secure_password';
   CREATE DATABASE merai_db OWNER merai_user;
   GRANT ALL PRIVILEGES ON DATABASE merai_db TO merai_user;
   ```

2. Execute the schema migration:
   ```bash
   psql -U merai_user -d merai_db -f server/schema.sql
   ```

3. Update `server/.env`:
   ```ini
   DATABASE_URL=postgresql://merai_user:your_secure_password@localhost:5432/merai_db
   ```

*Note on Development Mode:* If PostgreSQL credentials are not configured, the application automatically runs in Development Fallback Mode with transparent local persistence. It never pretends a database is connected when it is not.

---

## 5. Key Portals & Authentication Credentials

| Role | Portal Route | Test Email | Password | Permissions |
|---|---|---|---|---|
| **Customer** | `/account` | `skr2436228@gmail.com` | `DriverMerai#2026` | Purchase, Order History, Invoice Download, Profile |
| **Admin** | `/admin` | `admin@sieme.in` | `Admin@2026` | Edit Stock, Change Prices, Order Fulfillment, SKU Management |
| **Distributor** | `/distributor` | `dealer@sieme.in` | `Dealer@2026` | Export Manifest (CSV), Customer Contact Info, Bulk Consignment |

---

## 6. Target Domain Deployment (`merai.sieme.in`)

### Step 1: DNS Configuration
Add an `A` record pointing to your cloud server IP:
```
Type: A
Host: merai
Domain: sieme.in
Target: <YOUR_SERVER_PUBLIC_IP>
```

### Step 2: Build the Frontend
```bash
npm run build
# Outputs optimized static files into dist/
```

### Step 3: Configure Nginx & Let's Encrypt SSL
```nginx
server {
    listen 80;
    server_name merai.sieme.in;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name merai.sieme.in;

    ssl_certificate /etc/letsencrypt/live/merai.sieme.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/merai.sieme.in/privkey.pem;

    # Frontend Static Files
    root /var/www/merai-sieme/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Reverse Proxy to Flask Backend
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 7. Quality & Verification Summary

- [x] **Top Bar Contract:** Brand zone, clean single-line nav links, and primary cart/search zone.
- [x] **Product Gallery:** Automatic image rotation every 3.5 seconds (within 2-5s requirement) with hover-pause.
- [x] **AI Assist Search:** Working fuzzy query expansion for `Driver.MERAI`, `Car Display`, `Car Screen`, `Android Display`, `Dash Display`, and `Daiichi Edition`.
- [x] **Inventory Safeguards:** Prevents orders exceeding available stock; decrements stock sequentially (200 $\to$ 199 $\to$ 198).
- [x] **Multi-Language:** 5 fully translated languages including RTL Arabic layout.
- [x] **Demo Payments:** Clearly labeled demo verification with zero raw secret card storage.
