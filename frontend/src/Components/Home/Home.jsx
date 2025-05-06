import React from 'react';
import Header from '../Header/Header.jsx';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const featureData = [
  {
    title: 'Demand Forecasting',
    desc: 'Predict demand using AI and trends to prevent stockouts and overstocking.',
    img: 'https://cdn-icons-png.flaticon.com/512/2329/2329083.png',
    route: 'demand-forecasting'
  },
  {
    title: 'Inventory Optimization',
    desc: 'AI-driven recommendations on stock levels and reorder points.',
    img: 'https://cdn-icons-png.flaticon.com/512/2920/2920222.png',
    route: 'inventory-optimization',
  },
  {
    title: 'Supplier Analytics',
    desc: 'Evaluate supplier performance with AI scoring and trend analysis.',
    img: 'https://cdn-icons-png.flaticon.com/512/4359/4359960.png',
    route: 'supplier-analytics',
  },
  {
    title: 'Route Optimization',
    desc: 'AI plans fastest routes to reduce delivery time and fuel costs.',
    img: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
    route: 'route-optimization',
  },
  {
    title: 'Auto Purchase Orders',
    desc: 'Smart alerts and auto-ordering via WhatsApp or email.',
    img: 'https://cdn-icons-png.flaticon.com/512/3595/3595455.png',
    route: 'purchase-orders',
  },
  {
    title: 'Dynamic Pricing',
    desc: 'Get pricing suggestions based on demand and competitors.',
    img: 'https://cdn-icons-png.flaticon.com/512/2936/2936844.png',
    route: 'dynamic-pricing',
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleFeatureClick = (route) => {
      navigate(route);
  };

  return (
    <div className="home-page">
      <Header />
      <div className="container space">
        <div className="section-header">
          <h2 className="section-title">Our AI-Powered Features</h2>
          <p className="section-subtitle">Transform your supply chain with our intelligent solutions</p>
        </div>
        <div className="features-container">
          {featureData.map((feature) => (
            <div
              key={feature.route}
              className="feature-card"
              onClick={() => handleFeatureClick(feature.route)}
            >
              <div className="feature-icon-container">
                <img src={feature.img} alt={feature.title} className="feature-icon" />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;