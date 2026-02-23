import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function GetEmployee() {
    let [empid, setempid] = useState("")
    let [employee, setEmployee] = useState([])
    let [reload, setreload] = useState(false)
    let [showform, setshowform] = useState(false)
    let [firstname, setfirstname] = useState("");
    let [middlename, setmiddlename] = useState("")
    let [lastname, setlastname] = useState("")
    let [gender, setgender] = useState("")
    let [email, setemail] = useState("")
    let [dob, setdob] = useState("")
    let [contactno, setcontactno] = useState("")
    let [adharno, setadharno] = useState("")
    let [panno, setpanno] = useState("");
    let [address, setAddress] = useState("");
    let [profile, setProfile] = useState("");

    // professional details
    let [exp, setExp] = useState("");
    let [salary, setsalary] = useState(0.0);
    let [joiningdate, setjoiningdate] = useState("");
    let [department, setdepartment] = useState("");
    let [designation, setdesignation] = useState("");
    let [reportingmanager, setreportingmanager] = useState("");
    let [status, setstatus] = useState("");
    let [worklocation, setworklocation] = useState("");

    //searching variables
    let[searchby,setsearchby]=useState("");
    let[keyword,setkeyword]=useState("");
    let[searchresult,setsearchresult]=useState([]);


    useEffect(() => {
        axios.get("https://employee-management-system-backend-1-dd4q.onrender.com/findallemp")
            .then((response) => {
                setEmployee(response.data);
            })
            .catch(() => {
                alert("Error in data fetching");
            })
    }, [reload])

    let deleteemp = (empid) => {
    
        axios.delete(`https://employee-management-system-backend-1-dd4q.onrender.com/deletebyempid?empid=${empid}`)
            .then((response) => {
                if (response.data === "Employee record deleted Sucessfully") {
                    alert(response.data)
                    setreload(!reload)
                }
            })
            .catch(() => {
                alert("error in delete opration")
            })
    }
    let handleprofile=(event)=>
    {
    let file=event.target.files[0]
    console.log(file.name)
    let filepath=`./img/${file.name}`
    setProfile(filepath);
    console.log(filepath)
    }

    let readytopupdate = (emp) => {
        // console.log(emp);
        setempid(emp.empid)
        setshowform(true);
        setfirstname(emp.firstname);
        setmiddlename(emp.middlename);
        setlastname(emp.lastname);
        setdob(emp.dob);
        setAddress(emp.address);
        setgender(emp.gender);
        setemail(emp.email);
        setcontactno(emp.contactno);
        setadharno(emp.adharno);
        setpanno(emp.panno);
        setExp(emp.exp);
        setsalary(emp.salary);
        setjoiningdate(emp.joiningdate);
        setreportingmanager(emp.reportingmanager);
        setstatus(emp.status);
        setworklocation(emp.worklocation);
        setdepartment(emp.department);
        setdesignation(emp.designation);
        setProfile(emp.profile);
        
    }
    let update=(event)=>
    {
        event.preventDefault();   // VERY IMPORTANT

        let updatedrecord={empid, firstname, lastname, email, gender,contactno, panno, adharno, dob, address,department, designation, exp, joiningdate,worklocation, reportingmanager, status,salary, profile };
        
        axios.put(`https://employee-management-system-backend-1-dd4q.onrender.com/updatebyempid?empid=${empid}`, updatedrecord)
        .then((response) => {
            alert("Employee Updated Successfully")
            setshowform(false)
            setreload(!reload)
        })
        .catch(() => {
            alert("Error in updating employee")
        })
    }
    let searchemployee=()=>{
        let url;
        if(searchby==="firstname"){
            url=`https://employee-management-system-backend-1-dd4q.onrender.com/findbyfirstname?firstname=${keyword}`
        }
        else if(searchby==="lastname"){
            url=`https://employee-management-system-backend-1-dd4q.onrender.com/findbylastname?lastname=${keyword}`
        }
        else if(searchby==="department"){
            url=`https://employee-management-system-backend-1-dd4q.onrender.com/findbydepartment?department=${keyword}`
        }
        else{
            url=`https://employee-management-system-backend-1-dd4q.onrender.com/findbydesignation?designation=${keyword}`
        }
        axios.get(url)
        .then((response)=>{
            //response.data
            if(response.data.length===0){
                alert(`No matching record found for given ${searchby}`)
                setsearchresult([])
                setreload(!reload);
            }
            else{
                setsearchresult(response.data);
            }
        })
        .catch((error)=>{
            alert("Error in Search opration")
        })
    }

    return (
        <div>
            <div className="d-flex gap-2">
                Select Searchby:
                <select
                onChange={(event)=>{setsearchby(event.target.value)}}>
                    <option>Select searchoption</option>
                    <option value="firstname" >Firstname</option>
                    <option value="lastname">Lastname</option>
                    <option value="designation">Designation</option>
                    <option value="department">Department</option>
                </select>
                {
                    searchby&&
                    
                    <div>
                        <input type="text" placeholder={`Enter ${searchby}`}
                        onChange={(event)=>setkeyword(event.target.value)}></input>
                        <button className="btn btn-warning"
                        onClick={searchemployee}>Search</button>
                        </div>
                }
            </div>
            <div className="container">
                <div className="row">

                    { 
                  (searchresult.length>0?searchresult:employee).map((emp) =>

                        <div key={emp.empid} className="card col-3 m-2" style={{ width: "18rem" }}>
                            <img src={emp.profile} className="card-img-top" alt="profile" />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {emp.firstname} {emp.lastname}
                                </h5>

                                <div className="card-text">
                                    <p>Email: <strong>{emp.email}</strong></p>
                                    <p>Contactno: <strong>{emp.contactno}</strong></p>
                                    <p>Department: <strong>{emp.department}</strong></p>
                                    <p>Designation: <strong>{emp.designation}</strong></p>
                                    <p>DOB: <strong>{emp.dob}</strong></p>
                                </div>

                                <div className="btngorup d-flex gap-2">
                                    <button className="btn btn-warning"
                                        onClick={() => readytopupdate(emp)}>
                                        Update
                                    </button>

                                    <button className="btn btn-danger"
                                        onClick={() => deleteemp(emp.empid)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {showform ?
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button"
                                    className="btn-close"
                                    onClick={() => setshowform(false)}>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="container mt-4">
                                    <div className="card shadow">
                                        <div className="card-body">
                                            <h4 className="text-center mb-4">Update Employee</h4>

                                            <form onSubmit={update}>

                                                <h5>Personal Details</h5>

                                                <div className="row">
                                                    <div className="col-md-4 mb-3">
                                                        <label>First Name</label>
                                                        <input type="text" className="form-control"
                                                            value={firstname}
                                                            onChange={(e) => setfirstname(e.target.value)} />
                                                    </div>

                                                    <div className="col-md-4 mb-3">
                                                        <label>Middle Name</label>
                                                        <input type="text" className="form-control"
                                                            value={middlename}
                                                            onChange={(e) => setmiddlename(e.target.value)} />
                                                    </div>

                                                    <div className="col-md-4 mb-3">
                                                        <label>Last Name</label>
                                                        <input type="text" className="form-control"
                                                            value={lastname}
                                                            onChange={(e) => setlastname(e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4 mb-3">
                                                        <label>Gender</label>
                                                        <select className="form-control"
                                                            value={gender}
                                                            onChange={(e) => setgender(e.target.value)}>
                                                            <option value="">Select Gender</option>
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-4 mb-3">
                                                        <label>Email</label>
                                                        <input type="email" className="form-control"
                                                            value={email}
                                                            onChange={(event) => setemail(event.target.value)} />
                                                    </div>

                                                    <div className="col-md-4 mb-3">
                                                        <label>DOB</label>
                                                        <input type="date" className="form-control"
                                                            value={dob}
                                                            onChange={(event) => setdob(event.target.value)} />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4 mb-3">
                                                        <label>Contact No</label>
                                                        <input type="text" className="form-control"
                                                            value={contactno}
                                                            onChange={(event) => setcontactno(event.target.value)} />
                                                    </div>

                                                    <div className="col-md-4 mb-3">
                                                        <label>Aadhar No</label>
                                                        <input type="text" className="form-control"
                                                            value={adharno}
                                                            onChange={(event) => setadharno(event.target.value)} />
                                                    </div>

                                                    <div className="col-md-4 mb-3">
                                                        <label>PAN No</label>
                                                        <input type="text" className="form-control"
                                                            value={panno}
                                                            onChange={(event) => setpanno(event.target.value)} />
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label>Address</label>
                                                    <textarea className="form-control"
                                                        value={address}
                                                        onChange={(event) => setAddress(event.target.value)} />
                                                </div>

                                                <h5>Professional Details</h5>

                                                <div className="row">
                                                    <div className="col-md-4 mb-3">
                                                        <label>Experience</label>
                                                        <input type="number" className="form-control"
                                                            value={exp}
                                                            onChange={(event) => setExp(event.target.value)} />
                                                    </div>

                                                    <div className="col-md-4 mb-3">
                                                        <label>Salary</label>
                                                        <input type="number" className="form-control"
                                                            value={salary}
                                                            onChange={(event) => setsalary(event.target.value)} />
                                                    </div>

                                                    <div className="col-md-4 mb-3">
                                                        <label>Joining Date</label>
                                                        <input type="date" className="form-control"
                                                            value={joiningdate}
                                                            onChange={(event) => setjoiningdate(event.target.value)} />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4 mb-3">
                                                        <label>Department</label>
                                                        <input type="text" className="form-control"
                                                            value={department}
                                                            onChange={(event) => setdepartment(event.target.value)} />
                                                    </div>

                                                    <div className="col-md-4 mb-3">
                                                        <label>Designation</label>
                                                        <input type="text" className="form-control"
                                                            value={designation}
                                                            onChange={(event) => setdesignation(event.target.value)} />
                                                    </div>

                                                    <div className="col-md-4 mb-3">
                                                        <label>Reporting Manager</label>
                                                        <input type="text" className="form-control"
                                                            value={reportingmanager}
                                                            onChange={(event) => setreportingmanager(event.target.value)} />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label>Status</label>
                                                        <select className="form-control"
                                                            value={status}
                                                            onChange={(event) => setstatus(event.target.value)}>
                                                            <option value="">Select Status</option>
                                                            <option>Active</option>
                                                            <option>Inactive</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <label>Work Location</label>
                                                        <input type="text" className="form-control"
                                                            value={worklocation}
                                                            onChange={(event) => setworklocation(event.target.value)} />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4 mb-3">
                                                        <label>Profile Photo</label>
                                                        <input type="file"
                                                            className="form-control"
                                                            accept="image/*"
                                                            onChange={(event)=>{handleprofile(event)}} />
                                                    </div>

                                                    <div className="col-md-4 mb-3">
                                                        <label>Preview</label>
                                                        {profile && <img src={profile} height="150" alt="preview" />}
                                                    </div>
                                                </div>

                                                <div className="text-center mt-3">
                                                    <button type="submit" className="btn btn-primary px-4">
                                                        Update Employee
                                                    </button>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : null}
        </div>
    )
}
