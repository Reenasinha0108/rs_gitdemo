import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            GloLogistics is a global leader in logistics and supply chain solutions, committed to providing
            reliable and efficient shipment management services worldwide.
          </p>
        </div>

        <div className="footer-section">
          <h4>Address</h4>
          <p>123 Main Street</p>
          <p>New York, NY 10001</p>
          <p>United States</p>
          <p>Email: info@gologistics.com</p>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Support: support@gologistics.com</p>
          <p>Sales: sales@gologistics.com</p>
          <p>Procurement: procurement@gologistics.com</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#facebook" aria-label="Facebook">f</a>
            <a href="#twitter" aria-label="Twitter">𝕏</a>
            <a href="#linkedin" aria-label="LinkedIn">in</a>
            <a href="#instagram" aria-label="Instagram">📷</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 GloLogistics. All rights reserved. Logistics Solutions for a Connected Global Village.</p>
      </div>
    </footer>
  );
};

export default Footer;
