import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'; 
import './Login.css';
import robotIcon from '../../assets/Ai_robot.png';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password: password
        }),
      });
  
      if (!response.ok) {
        throw new Error("Login failed");
      }
  
      const data = await response.json();
      console.log("Login successful:", data);
      localStorage.setItem("token", data.access_token); // Save JWT token
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-main-container">
      <div className="login-content-container">
        <div className="login-left-section">
          <div className="login-brand-section">
            <h1 className="login-brand-name">OptiChain</h1>
            <p className="login-brand-description">
              AI-powered supply chain optimization platform
            </p>
          </div>
          <img 
            src={robotIcon} 
            alt="AI Assistant" 
            className="login-robot-image" 
          />
        </div>
        
        <div className="login-right-section">
          <div className="login-form-container">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to continue to your account</p>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <input
                  type="email"
                  className="login-input"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="input-group">
                <input
                  type="password"
                  className="login-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="login-btn">
                Login
                <span className="btn-arrow">→</span>
              </button>
            </form>
            
            <div className="login-footer">
              <a href="#" className="forgot-password">Forgot password?</a>
              <span className="no-account">
                Don't have an account?{' '}
                <Link to="/registration" className="signup-link">
                  Sign Up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;