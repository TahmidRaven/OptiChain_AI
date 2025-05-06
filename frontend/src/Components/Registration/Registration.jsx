import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Registration.css';
import robotIcon from '../../assets/Ai_robot.png';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          email,
          password
        }),
      });
  
      if (!response.ok) {
        throw new Error("Registration failed");
      }
  
      const data = await response.json();
      console.log("Registration successful:", data);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div className="registration-main-container">
      <div className="registration-content-container">
        <div className="registration-left-section">
          <div className="registration-brand-section">
            <h1 className="registration-brand-name">OptiChain</h1>
            <p className="registration-brand-description">
              AI-powered supply chain optimization platform
            </p>
          </div>
          <img 
            src={robotIcon} 
            alt="AI Assistant" 
            className="registration-robot-image" 
          />
        </div>
        
        <div className="registration-right-section">
          <div className="registration-form-container">
            <h2 className="registration-title">Create Account</h2>
            <p className="registration-subtitle">Join our platform to optimize your supply chain</p>
            
            <form onSubmit={handleSubmit} className="registration-form">
              <div className="input-group">
                <input
                  type="text"
                  className="registration-input"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="input-group">
                <input
                  type="email"
                  className="registration-input"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="input-group">
                <input
                  type="password"
                  className="registration-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="registration-btn">
                Register
                <span className="btn-arrow">→</span>
              </button>
            </form>
            
            <div className="registration-footer">
              <span className="have-account">
                Already have an account?{' '}
                <Link to="/login" className="login-link">
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;