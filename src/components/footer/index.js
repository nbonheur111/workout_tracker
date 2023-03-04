import React from 'react';
import './index.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="useful-links">
        <h3>Useful Links</h3>
        <ul className="footer-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Workouts</a></li>
          <li><a href="#">Nutrition</a></li>
          <li><a href="#">Shop</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
      <div className="contact-us">
        <h3>Contact Us</h3>
        <ul className="contact-info">
          <li><i className="fas fa-map-marker-alt"></i>123 Main St, Nowhere USA</li>
          <li><i className="fas fa-phone"></i>(123) 456-7890</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
