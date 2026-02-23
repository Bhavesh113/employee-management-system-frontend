import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import EmpNav from './EmpNav';


export default function EmployeeDashboard() {
    
    let [employee, setEmployee] = useState([])
    let[reload,setreload]=useState(false)
    
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

    let searchemployee=()=>{
        let url;
        if(searchby==="firstname"){
            url=`https://employee-management-system-backend-1-dd4q.onrender.com/findbyfirstname?firstname=${keyword}`
        }
        else if(searchby==="lastname"){
            url=`https://employee-management-system-backend-1-dd4q.onrender.com?lastname=${keyword}`
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
        
        <h1 className="employeeheading">Employee DashBoard</h1>
        <div className="container-fluid">
                Select Searchby:
                <select
                onChange={(event)=>{setsearchby(event.target.value)}}>
                    <option value="">Select Search Type</option>
                    <option value="firstname" >Firstname</option>
                    <option value="lastname">Lastname</option>
                    <option value="designation">Designation</option>
                    <option value="department">Department</option>
                </select>
                {
                    searchby&&
                    
                    <div className="container-fluid">
                        <input type="text" placeholder={`Enter ${searchby}`}
                        onChange={(event)=>setkeyword(event.target.value)}></input>
                        <button className="btn btn-warning"
                        onClick={searchemployee}>Search</button>
                        </div>
                }
            </div>
            <div className="container-fluid">
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
                            </div>
                        </div>
                    )}

                </div>
            </div>
    </div>
  )
}
