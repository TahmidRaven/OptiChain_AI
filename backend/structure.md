optichain/
├── backend/
│   ├── __init__.py
│   ├── main.py                    # FastAPI app setup
│   ├── models.py                  # Database models (User, Item, etc.)
│   ├── schemas.py                 # Pydantic schemas (UserCreate, UserLogin, etc.)
│   ├── auth.py                    # Authentication utilities (JWT, password hashing)
│   ├── routers/                   # API route definitions
│   │   ├── __init__.py
│   │   ├── auth.py                # Routes for registration, login, etc.
│   │   └── items.py               # Example route for item-related functionality
│   ├── database.py                # Database initialization and Tortoise setup
│   └── config.py                  # Configuration settings (e.g., secret key, DB settings)
├── frontend/
│   ├── public/
│   │   └── index.html             # Basic HTML template (if using React with create-react-app)
│   ├── src/
│   │   ├── api.js                 # Axios setup for API calls
│   │   ├── components/            # React components (Login, Register, etc.)
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── pages/                 # React page components (e.g., Home, Dashboard)
│   │   │   ├── Home.js
│   │   │   └── Dashboard.js
│   │   ├── App.js                 # Main App component
│   │   └── index.js               # React entry point
│   └── package.json               # Frontend dependencies (React, Axios, etc.)
├── .env                           # Environment variables (e.g., secret key, DB URL)
├── requirements.txt               # Python dependencies
└── README.md                      # Project documentation
