import React from 'react'
import HomeNav from './HomeNav'
// import Navbar from './Navbar'
// import EmpNav from './EmpNav'
import { useLocation } from 'react-router-dom'

export default function Home() {
  let loggedin=JSON.parse(localStorage.getItem("IsLoggedIn"))
  let location=useLocation();
  
  return (
    <div>
     {!loggedin && location.pathname==="/"?<HomeNav></HomeNav>:null}
          
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >

        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner">

          <div className="carousel-item active">
            <img
              src="https://5.imimg.com/data5/SELLER/Default/2022/10/UW/RK/ID/80384299/employee-data-management-services.jpeg"
              className="d-block w-100"
              alt="slide1"
              style={{ height: "1000px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Employee Data Management</h5>
              <p>Manage employee records efficiently and securely.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://png.pngtree.com/background/20210714/original/pngtree-original-design-business-office-management-system-background-banner-picture-image_1191085.jpg"
              className="d-block w-100"
              alt="slide2"
              style={{ height: "1000px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Modern Office System</h5>
              <p>Smart and modern solutions for HR management.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://www.shutterstock.com/image-photo/hrhuman-resources-technologyonline-modern-technologies-260nw-2139960475.jpg"
              className="d-block w-100"
              alt="slide3"
              style={{ height: "1000px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>HR Technology</h5>
              <p>Empowering businesses with digital HR solutions.</p>
            </div>
          </div>

        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>

      </div>

    </div>
  )
}
