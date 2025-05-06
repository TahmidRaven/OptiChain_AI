import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/Logo.svg';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="header container">
            <div className="header-left">
                <Link to="/" className="logo-container">
                <img src={logo} alt="OptiChain Logo" className="logo-img" />
                </Link>
                <button 
                className="mobile-menu-button" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                >
                <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
                <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
                <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
                </button>
                <nav className={`navigation ${isMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? "active" : ""}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </NavLink>
                    </li>
                    <li>
                    <NavLink 
                        to="/contact" 
                        className={({ isActive }) => isActive ? "active" : ""}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Contact
                    </NavLink>
                    </li>
                </ul>
                </nav>
            </div>
            <div className="header-right">
                <Link to="/login" className="get-started-btn">
                    Log In
                </Link>
            </div>
        </header>
    );
};

export default Navbar;