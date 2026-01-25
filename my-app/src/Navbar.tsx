import React, { useState } from 'react'
import './Navbar.css'
import logo from './assets/health.symbol-removebg-preview.png'
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#" className="logo">
          <span className="logo-icon"><img src={logo} alt="Logo" height="50px"/></span>
          <span className="logo-text">HealthCare Plus</span>
        </a>
        
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#departments">Departments</a></li>
          <li><a href="#doctors">Doctors</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#appointments">Appointments</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#login" className="btn-login">Login</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar