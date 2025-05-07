import React, { useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const ForecastDashboard = () => {
  const [sku, setSku] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('sales');

  const forecastDataFromCSV = [
    { date: '2025-05-01', sku: 'Tshirt_Black_S', sales: 16, stock_level: 205, supplier_rating: 3.55, our_price_usd: 24.73 },
    { date: '2025-05-09', sku: 'Tshirt_Black_S', sales: 36, stock_level: 166, supplier_rating: 3.46, our_price_usd: 40.42 },
    { date: '2025-05-11', sku: 'Tshirt_Black_S', sales: 34, stock_level: 277, supplier_rating: 3.97, our_price_usd: 36.31 },
    { date: '2025-05-21', sku: 'Tshirt_Black_S', sales: 45, stock_level: 176, supplier_rating: 3.07, our_price_usd: 41.49 },
    { date: '2025-05-28', sku: 'Tshirt_Black_S', sales: 38, stock_level: 78, supplier_rating: 4.12, our_price_usd: 48.46 },
    { date: '2025-05-31', sku: 'Tshirt_Black_S', sales: 24, stock_level: 127, supplier_rating: 3.27, our_price_usd: 29.27 },
    // Add more SKUs as needed
  ];

  const handleForecast = () => {
    setLoading(true);
    const filtered = forecastDataFromCSV.filter(
      item => item.sku === sku && (!startDate || item.date >= startDate) && (!endDate || item.date <= endDate)
    );
    setForecastData(filtered);
    setLoading(false);
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '3rem auto',
    padding: '2rem',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    color: 'blue',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  };

  const inputStyle = {
    flex: 1,
    padding: '0.7rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.15)',
    color: 'orange',
    margin: '0.5rem 0',
    fontSize: '16px',
  };

  const chartContainerStyle = {
    height: '320px',
    marginTop: '2rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '15px',
    padding: '1rem',
  };

  const pageBackground = {
    background: 'url("https://images.unsplash.com/photo-1604079628043-b8c46c5f07c4?auto=format&fit=crop&w=1950&q=80") no-repeat center center fixed',
    backgroundSize: 'cover',
    minHeight: '100vh',
    padding: '2rem',
  };

  return (
    <div style={pageBackground}>
      <style>
        {`
          input::placeholder {
            color: #ddd;
          }
          input::-webkit-calendar-picker-indicator {
            filter: invert(1);
          }
        `}
      </style>

      <div style={containerStyle}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>
          📈 Sales Forecast Dashboard
        </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <input type="text" placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} style={inputStyle} />
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={inputStyle} />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <button onClick={handleForecast} style={{ ...inputStyle, cursor: 'pointer', background: '#bbdefb', color: 'black' }}>
            {loading ? 'Loading...' : 'Get Forecast'}
          </button>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer', background: '#e1bee7', color: 'black' }}
          >
            <option value="sales">Sales</option>
            <option value="stock_level">Stock Level</option>
            <option value="our_price_usd">Our Price (USD)</option>
          </select>
        </div>

        {forecastData.length > 0 && (
          <div style={chartContainerStyle}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey={selectedMetric} stroke="#bb86fc" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForecastDashboard;
