import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import About from '../about'
import './index.css';

const Footer = () => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/About');
  };
  return (
    <footer className="footer">
      <div className="useful-links">
        <h3>Useful Links</h3>
        <ul className="footer-links">
          <li> <Link to="/workout" >Home</Link></li>
          <li><Link to="/workout/create" >Workouts</Link></li>
          <li onClick={handleClick}><Link to="/About" >Edit</Link></li>
         
        </ul>
      </div>
      <div className="contact-us">
        <h3>Contact Us</h3>
        <ul className="contact-info">
        <li><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Main St, Nowhere, USA</li>
          <li><FontAwesomeIcon icon={faPhone} /> (123) 456-7890</li>

        </ul>
      </div>
    </footer>
  );
};

export default Footer;
