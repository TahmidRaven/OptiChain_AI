import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3 className="footer-logo">OptiChain</h3>
                        <p className="footer-description">
                        AI-powered supply chain optimization for SMEs
                        <br />
                        Dhaka, Bangladesh
                        </p>
                    </div>
                </div>
                
                <div className="footer-copyright">
                <p>&copy; {new Date().getFullYear()} OptiChain. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;