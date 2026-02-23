import React from "react";

export default function Aboutus() {
  return (
    <div className="container mt-5">

      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">
          About Our Employee Management System
        </h1>
        <p className="lead">
          A modern HR-tech solution designed to simplify workforce management 
          through smart digital transformation.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="row align-items-center g-4 mb-5">
        <div className="col-md-6">
          <h2 className="fw-bold text-dark">Our Mission</h2>
          <p>
            To streamline workforce management through innovative digital 
            solutions that enhance productivity, transparency, and efficiency.
          </p>
        </div>

        <div className="col-md-6">
          <div className="card p-4 bg-primary text-white shadow-lg rounded">
            <h3 className="fw-bold">Our Vision</h3>
            <p>
              To become a trusted global platform for employee lifecycle 
              management, empowering organizations with intelligent HR tools.
            </p>
          </div>
        </div>
      </div>

      {/* Our Services */}
      <div className="mb-5">
        <h2 className="text-center fw-bold mb-4">What We Offer</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm">
              <h5>Employee Record Management</h5>
              <p>Centralized and secure employee data storage.</p>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm">
              <h5>Attendance & Leave Tracking</h5>
              <p>Real-time attendance and leave monitoring system.</p>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm">
              <h5>Role-Based Access</h5>
              <p>Secure access control for admin and employees.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-light p-4 rounded shadow-sm mb-5">
        <h2 className="text-center fw-bold mb-3">Why Choose Us?</h2>
        <ul className="list-unstyled text-center">
          <li>⚡ Fast & Responsive Design</li>
          <li>🔒 Secure Data Management</li>
          <li>📊 Real-Time Reporting</li>
          <li>🌐 Cloud-Based Architecture</li>
        </ul>
      </div>

      {/* Location Section */}
      <div className="mb-5">
        <h2 className="text-center fw-bold mb-4">Our Location</h2>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="shadow rounded overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.5960439526875!2d73.85437477465089!3d18.46998317071863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb2005244527%3A0xd57368a39eb42be4!2sHefShine%20Softwares!5e1!3m2!1sen!2sin!4v1771071289473!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Company Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Section */}
      <div className="text-center mb-5">
        <h4 className="fw-bold">Developed By</h4>
        <p>
          <strong>Bhavesh Gangarde</strong> <br />
          Java Full Stack Developer | Pune <br />
          Passionate about building scalable enterprise applications.
        </p>
      </div>

    </div>
  );
}
