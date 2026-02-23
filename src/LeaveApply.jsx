import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function LeaveApply() {

  let [firstname, setFirstname] = useState("");
  let [lastname, setLastname] = useState("");
  let [empid, setEmpid] = useState("");
  let [fromdate, setFromdate] = useState("");
  let [todate, setTodate] = useState("");
  let [reason, setReason] = useState("");
  let today=new Date().toISOString().split("T")[0];

  
  useEffect(()=>{
     let user=JSON.parse(localStorage.getItem("userinfo"));
     console.log(user)
     if(user){
       setFirstname(user.firstname);
       setLastname(user.lastname)
       setEmpid(user.empid);
     }
  },[])

  let applyLeave = (event) => {

    event.preventDefault();
    if(fromdate<today){
      alert("Fromdate must greter or equal to today")
      return;
    }

    let leaveData = {firstname,lastname,fromdate,todate,reason,employee: {
        empid: empid
      }
    };
    axios.post("https://employee-management-system-backend-1-dd4q.onrender.com/applyleave", leaveData)
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        alert("Error applying leave");
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card p-4 shadow">
        <h4 className="text-center mb-4">Apply For Leave</h4>

        <form onSubmit={applyLeave}>

          <input type="text" className="form-control mb-3"
            placeholder="First Name" value={firstname} readOnly />

          <input type="text" className="form-control mb-3"
            placeholder="Last Name" value={lastname} readOnly />

          <input type="number" className="form-control mb-3"
            placeholder="Employee ID" value={empid} readOnly/>

          <input type="date" className="form-control mb-3" min={today}
            onChange={(event) => setFromdate(event.target.value)} />

          <input type="date" className="form-control mb-3"
            onChange={(event) => setTodate(event.target.value)} />

          <textarea className="form-control mb-3"
            placeholder="Reason"
            onChange={(event) => setReason(event.target.value)} />

          <button className="btn btn-primary w-100">
            Apply For Leave
          </button>

        </form>
      </div>
    </div>
  );
}
