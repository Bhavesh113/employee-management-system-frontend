import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeNav() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-primary bg-warning">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">EMS Dashboard</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about"className="nav-link">About Us</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact"className="nav-link">Contact Us</Link>
        </li>
         <li className="nav-item">
          <Link to="/services"className="nav-link">Our Services</Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">Register/Login</Link>
        </li>

        </ul>
     
    </div>
  </div>
</nav>
    </div>
  )
}
