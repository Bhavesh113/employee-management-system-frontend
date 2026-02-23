import React from 'react';

export default function Services() {
  const services = [
    { title: "Employee Onboarding", desc: "Automated digital workflows to welcome new hires seamlessly.", icon: "📝" },
    { title: "Payroll Management", desc: "Accurate and timely salary processing with tax compliance.", icon: "💰" },
    { title: "Performance Tracking", desc: "Analytics and tools to monitor growth and set professional goals.", icon: "📈" }
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Our Services</h2>
      <div className="row">
        {services.map((service, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm border-0 text-center p-3">
              <div style={{ fontSize: "3rem" }}>{service.icon}</div>
              <div className="card-body">
                <h5 className="card-title font-weight-bold">{service.title}</h5>
                <p className="card-text text-muted">{service.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}