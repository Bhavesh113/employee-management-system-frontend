import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {

  let [isRegistered, setIsRegistered] = useState(false);
  let [firstname, setFirstname] = useState("");
  let [lastname, setLastname] = useState("");
  let [email, setEmail] = useState("");
  let [gender, setGender] = useState("");
  let [empid, setEmpid] = useState("");
  let [contactno, setContactno] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [conformpassword, setConformpassword] = useState("");
  let [role, setRole] = useState("");

  let navigate = useNavigate();

  let register = (event) => {
    event.preventDefault();

    // ✅ Basic validation
    if (!firstname || !lastname || !email || !empid || !username || !password || !role) {
      alert("Please fill all required fields");
      return;
    }

    if (password !== conformpassword) {
      alert("Password does not match!");
      return;
    }

    axios.get(`https://employee-management-system-backend-1-dd4q.onrender.com/findbyempid?empid=${empid}`)
      .then((response) => {

        if (response.data.length === 0) {
          alert("Employee id does not exist. Registration failed.");
        } 
        else {

          let user = {
            firstname,
            lastname,
            email,
            gender,
            empid,
            contactno,
            username,
            password,
            conformpassword,
            role
          };

          axios.post("https://employee-management-system-backend-1-dd4q.onrender.com/register", user)
            .then((response) => {
              if (response.data === "Registration Sucessfully") {
                alert(response.data);
                setIsRegistered(true);
              }
            })
            .catch(() => {
              alert("Registration failed.");
            });
        }
      })
      .catch(() => {
        alert("Error checking employee ID");
      });
  };

  let login = (event) => {
    event.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    let user = { username, password };

    axios.post("https://employee-management-system-backend-1-dd4q.onrender.com/login", user)
      .then((response) => {
        if (response.data) {
          alert("Login Sucessful");

          let user = response.data;

          localStorage.setItem("IsLoggedIn", "true");
          localStorage.setItem("userinfo", JSON.stringify(user));

          if (user.role === "ADMIN") {
            navigate("/admindashboard");
          } else {
            navigate("/employeedashboard");
          }

        } else {
          alert("Invalid Username or Password");
        }
      })
      .catch(() => {
        alert("Error in Login");
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>

      {!isRegistered ?

        <div className="card p-4 shadow">
          <h2 className="text-center mb-4">User Registration</h2>

          <form onSubmit={register}>

            <input type="text" className="form-control mb-2"
              placeholder="First Name"
              onChange={(event) => setFirstname(event.target.value)} />

            <input type="text" className="form-control mb-2"
              placeholder="Last Name"
              onChange={(event) => setLastname(event.target.value)} />

            <input type="email" className="form-control mb-2"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)} />

            <select className="form-select mb-2"
              onChange={(event) => setGender(event.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <input type="text" className="form-control mb-2"
              placeholder="Employee ID"
              onChange={(event) => setEmpid(event.target.value)} />

            <input type="text" className="form-control mb-2"
              placeholder="Contact Number"
              onChange={(event) => setContactno(event.target.value)} />

            <input type="text" className="form-control mb-2"
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)} />

            <input type="password" className="form-control mb-2"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)} />

            <input type="password" className="form-control mb-2"
              placeholder="Confirm Password"
              onChange={(event) => setConformpassword(event.target.value)} />

            <select className="form-select mb-3"
              onChange={(event) => setRole(event.target.value)}>
              <option value="">Select Role</option>
              <option value="ADMIN">ADMIN</option>
              <option value="EMPLOYEE">EMPLOYEE</option>
            </select>

            <button type="submit" className="btn btn-success w-100">
              Register
            </button>

            <button type="button"
              className="btn btn-link mt-2"
              onClick={() => setIsRegistered(true)}>
              Already have account? Login
            </button>

          </form>
        </div>

        :

        <div className="card p-4 shadow">
          <h4 className="text-center mb-4">Login</h4>

          <form onSubmit={login}>
            <input type="text"
              className="form-control mb-3"
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)} />

            <input type="password"
              className="form-control mb-3"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)} />

            <button className="btn btn-primary w-100">
              Login
            </button>

            <button type="button"
              className="btn btn-link mt-2"
              onClick={() => setIsRegistered(false)}>
              Don't have an account? Register
            </button>
          </form>
        </div>

      }
    </div>
  );
}
