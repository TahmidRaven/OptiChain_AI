# 🚀 OptiChain_AI

**AI-powered supply chain optimization for SMEs**

OptiChain is a smart, scalable platform designed to empower Small and Medium Enterprises (SMEs) with affordable logistics and supply chain intelligence. Leveraging advanced AI, it helps businesses forecast demand, manage inventory, and optimize supplier relationships—efficiently and affordably.

---

## 🌟 Key Features

### 🤖 AI-Powered Insights
- **Demand Forecasting**  
  Predict future demand using sales trends, seasonality, and AI models to reduce stockouts and overstocking.

- **Inventory Optimization**  
  Get intelligent stock level recommendations and automated reorder points to streamline inventory flow.

- **Supplier Analytics**  
  Evaluate supplier performance through AI-based scoring and trend analysis.

- **Route Optimization**  
  Reduce fuel costs and delivery times using optimized routing strategies.

- **Auto Purchase Orders**  
  Automatically send purchase orders and stock alerts via WhatsApp or email when thresholds are met.

- **Dynamic Pricing**  
  Adjust prices in real-time based on market demand and competitor pricing data.

---

## 🧩 Tech Stack

### Frontend
- React.js + Tailwind CSS
- Recharts for visualizations
- OAuth2 Google Login
- PDF report downloads

### Backend
- FastAPI (Python)
- Tortoise ORM + SQLite
- RESTful APIs
- CSV data processing and forecast engine

---

## 📁 Project Structure

/optichain
├── backend
│   ├── main.py (FastAPI app)
│   ├── models.py (Tortoise ORM models)
│   ├── inventory.py (Real-Time Inventory Management logic)
│   ├── populate_db.py (Script to populate the database with initial data)
│   ├── forecast.py (Demand forecasting logic)
│   └── schemas.py (Schemas for validation)
├── frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── InventoryAlerts.js (React component for inventory alerts)
│   │   ├── App.js (Main React.js app)
│   │   └── api.js (API helper functions)
├── db.sqlite3 (SQLite database file)
└── README.md
