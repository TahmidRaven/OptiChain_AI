import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'; 
import './Login.css';
import robotIcon from '../../assets/Ai_robot.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // Added loading state for UI feedback
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Show loading spinner or disable submit button
    
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password
        }),
      });

      if (!response.ok) {
        // Handle different error codes for better feedback
        if (response.status === 401) {
          throw new Error("Invalid username or password");
        } else {
          throw new Error("Login failed, please try again later");
        }
      }
  
      const data = await response.json();
      console.log("Login successful:", data);
      localStorage.setItem("token", data.access_token); // Save JWT token
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);  // Display specific error message
    } finally {
      setLoading(false);  // Stop loading spinner or re-enable submit button
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
                  type="text"
                  className="login-input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
              
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
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
