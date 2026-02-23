import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  let navigate = useNavigate();
  let logout=()=>{
    localStorage.removeItem("userinfo")
    localStorage.removeItem("IsLoggedIn")
    navigate("/");

  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-primary bg-warning"> {/* Changed to dark for better contrast */}
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Ems</Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/addemp" className="nav-link">Add Employee</Link>
              </li>
              <li className="nav-item">
                <Link to="/viewemp" className="nav-link">View Employee</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About Us</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact Us</Link>
              </li>
              <li className="nav-item">
                <Link to="/services" className="nav-link">Our Services</Link>
              </li>
               <li className="nav-item">
                <Link to="/Updateleavestatus" className="nav-link">Update Leavestatus</Link>
              </li>
              <li>
                <button onClick={logout}className="btn btn-danger">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}