import axios from "axios";
import React from "react";
import { useState } from "react";


function AddEmployee() {
let[firstname,setfirstname]=useState("");
let[middlename,setmiddlename]=useState("")
let[lastname,setlastname]=useState("")
let[gender,setgender]=useState("")
let[email,setemail]=useState("")
let[dob,setdob]=useState("")
let[contactno,setcontactno]=useState("")
let[adharno,setadharno]=useState("")
let[panno,setpanno] = useState("");
let[address,setAddress] = useState("");
let[profile,setProfile] = useState("");
// professional details
let[exp,setExp] = useState("");
let[salary,setsalary] = useState("");
let[joiningdate,setjoiningdate] = useState("");
let[department,setdepartment] = useState("");
let[designation,setdesignation] = useState("");
let[reportingmanager,setreportingmanager] = useState("");
let[status,setstatus] = useState("");
let[worklocation,setworklocation] = useState("");



let handleprofile=(event)=>{
    let file=event.target.files[0]
    console.log(file.name)
    let filepath=`./img/${file.name}`
    setProfile(filepath);
    console.log(filepath)
}
 let validation=()=>{

          if(firstname===""||lastname===""||email===""||gender===""||contactno===""||address===""||panno===""||adharno===""||dob===""){
            alert("Please fill all the personal details")
            return false;
          }

          else if(! /^[A-Za-z]{2,20}$/.test(firstname)){
                alert("Firstname must contains only alphabets..")
                return false;
            }

          else if(! /^[A-Za-z]{2,20}$/.test(lastname)){
                alert("Lastname must contains only alphabets..")
                return false;
            }

          else if(! /^\d{10}$/.test(contactno)){
                alert("Enter 10 digits contact no....")
                return false;
            }

          else if(! /^[a-z]+[0-9]*@[a-z]+\.[a-z]{2,}$/.test(email)){       // + means minimum 1 character ,maximum any length   // * means minimum 0 character, maximum any length 
                    // amit  1308  @gmail  . com                             // . means single character in regular expression, so write "\." to print "."
                    
                alert("Please Enter valid email id")
                return false;
            }

          else if(! /^\d{12}$/.test(adharno)){
                alert("Enter 12 digits adhar no....")
                return false;
            }

          else if(! /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panno)){
                alert("Enter valid pan number...")
                return false;
            }
            else{
              return true;
            }
    }

let addemp=(event)=>{
    event.preventDefault();
     if(validation)
        {
          alert("Employee Added successfully..")
        }
    let employee={firstname,middlename,lastname,email,gender,
        dob,contactno,adharno,panno,address,profile,exp,
        salary,joiningdate,department,designation,reportingmanager,status,worklocation}
    axios.post("https://employee-management-system-backend-1-dd4q.onrender.com/addemp",employee)
    .then((response)=>{
        if(response.data==="Employee record added Sucessfully"){
            alert(response.data)
        }

    })
    .catch((error)=>{
        alert("Error in adding opration")
    })

}
  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h4 className="text-center mb-4">Add Employee</h4>

          <form onSubmit={addemp}>

            {/* Personal Details */}
            <h5 className="mb-3">Personal Details</h5>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">First Name</label>
                <input type="text" className="form-control" 
                 onChange={(event)=>{setfirstname(event.target.value)}}
                 name="firstname" />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Middle Name</label>
                <input type="text" className="form-control" 
                 onChange={(event)=>{setmiddlename(event.target.value)}}
                name="middlename" />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-control" 
                 onChange={(event)=>{setlastname(event.target.value)}}
                 name="lastname" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Gender</label>
                <select className="form-control" 
                 onChange={(event)=>{setgender(event.target.value)}}
                 name="gender">
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" 
                 onChange={(event)=>{setemail(event.target.value)}}
                 name="email" />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Date of Birth</label>
                <input type="date" className="form-control" 
                 onChange={(event)=>{setdob(event.target.value)}}
                 name="dob" />
                <small className="text-muted">Format: YYYY-MM-DD</small>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Contact Number</label>
                <input type="text" className="form-control" 
                 onChange={(event)=>{setcontactno(event.target.value)}}
                 name="contactno" />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Aadhar Number</label>
                <input type="text" className="form-control" 
                 onChange={(event)=>{setadharno(event.target.value)}}
                 name="adharno" />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">PAN Number</label>
                <input type="text" className="form-control" 
                 onChange={(event)=>{setpanno(event.target.value)}}
                 name="panno" />
              </div>
            </div>

          

            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea className="form-control" rows="2" 
               onChange={(event)=>{setAddress(event.target.value)}}
               name="address"></textarea>
            </div>

            {/* Professional Details */}
            <h5 className="mt-4 mb-3">Professional Details</h5>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Experience (Years)</label>
                <input type="number" className="form-control" 
                 onChange={(event)=>{setExp(event.target.value)}}
                 name="exp" />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Salary</label>
                <input type="number" className="form-control"
                 onChange={(event)=>{setsalary(event.target.value)}}
                 name="salary" />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Joining Date</label>
                <input type="date" className="form-control" 
                 onChange={(event)=>{setjoiningdate(event.target.value)}}
                 name="joiningdate" />
                <small className="text-muted">Format: YYYY-MM-DD</small>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Department</label>
                <input type="text" className="form-control" 
                 onChange={(event)=>{setdepartment(event.target.value)}}
                 name="department" />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Designation</label>
                <input type="text" className="form-control" 
                 onChange={(event)=>{setdesignation(event.target.value)}}
                 name="designation" />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Reporting Manager</label>
                <input type="text" className="form-control" 
                 onChange={(event)=>{setreportingmanager(event.target.value)}}
                 name="reportingmanager" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Status</label>
                <select className="form-control" 
                 onChange={(event)=>{setstatus(event.target.value)}}
                 name="status">
                  <option value="">Select Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Work Location</label>
                <input type="text" className="form-control" 
                 onChange={(event)=>{setworklocation(event.target.value)}}
                 name="worklocation" />
              </div>
            </div>
  {/* Profile Image Upload */}
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Profile Photo</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*" onChange={(event)=>{handleprofile(event)}}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Profile preview</label>
                <img src={profile} alt="Profile Preview" style={{ height: "150px" }} />
              </div>
            </div>
            <div className="text-center mt-3">
              <button type="submit" className="btn btn-primary px-4">
                Save Employee
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
