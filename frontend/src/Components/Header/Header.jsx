import React from 'react';
import './Header.css';
import Ai_robot from '../../assets/Ai_robot.png';
import Supplychain1 from '../../assets/supplychain1.jpg';
import Supplychain2 from '../../assets/supplychain2.jpg';

const Header = () => {
  return (
    <div className="main-header-container">
      <div className="main-header-content container">
        <div className="main-header-left">
          <div className="main-brand-section">
            <h1 className="main-brand-name">OptiChain</h1>
            <p className="main-brand-description">
              AI-powered supply chain optimization for SMEs. <br />
              Affordable, scalable solutions to transform your logistics.
            </p>
          </div>
          <div className="main-robot-container">
            <img src={Ai_robot} alt="AI Robot Assistant" className="main-ai-logo" />
          </div>
        </div>
        
        <div className="main-header-right">
          <div className="image-stack">
            <img src={Supplychain1} alt="Supply Chain" className="stacked-image bottom-image" />
            <img src={Supplychain2} alt="Supply Chain" className="stacked-image top-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;