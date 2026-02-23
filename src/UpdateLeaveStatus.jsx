import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'

export default function UpdateLeaveStatus() {

    let[reload,setreload]=useState(false);
    let[leaves,setleaves]=useState([]);

    useEffect(()=>{
        axios.get("https://employee-management-system-backend-1-dd4q.onrender.com/findallleaves")
        .then((response)=>{
            setleaves(response.data)
        })
        .catch((error)=>{
            alert("Error in data fetching")
        })
    },[reload])

    let Update=(leaveid,status)=>{
        axios.put(`https://employee-management-system-backend-1-dd4q.onrender.com/updateleavestatus?leaveid=${leaveid}&status=${status}`)
        .then((response)=>{
            if(response.data==="Leave Status Updated Successfully"){
                alert(response.data) 
                setreload(!reload)
            }
        })
        .catch((error)=>{
            alert("Error in updating the status")
        })
    }

  return (
    <div className="container mt-4">

        <table className="table table-bordered table-striped text-center">
            <thead className="table-dark">
                <tr>
                    <th>Leaveid</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Empid</th>
                    <th>Fromdate</th>
                    <th>Todate</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {
                    leaves.length > 0 ? (
                        leaves.map((l)=>(
                            <tr key={l.leaveid}>
                                <td>{l.leaveid}</td>
                                <td>{l.firstname}</td>
                                <td>{l.lastname}</td>
                               <td>{l.employee?.empid}</td>
                                <td>{l.fromdate}</td>
                                <td>{l.todate}</td>
                                <td>{l.reason}</td>
                                <td>{l.status}</td>
                                <td>

                    <button className="btn btn-danger" 
                    style={{"borderRadius":"20px"}}
                    onClick={()=>{Update(l.leaveid,"approve")}}
                    disabled={l.status !== "pending"}>Approve</button>

                    <button className="btn btn-warning"
                    style={{"borderRadius":"20px"}}
                    onClick={()=>{Update(l.leaveid,"reject")}}
                    disabled={l.status !== "pending"}>Reject</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No leave records found</td>
                        </tr>
                    )
                }
            </tbody>
        </table>

    </div>
  )
}