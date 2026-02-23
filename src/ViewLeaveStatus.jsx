import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

export default function ViewLeaveStatus() {

  let [leaves, setLeaves] = useState([]);
  let [show, setShow] = useState(false);
  let [selectedLeave, setSelectedLeave] = useState(null);

  let user = JSON.parse(localStorage.getItem("userinfo"));

  useEffect(() => {
    if (user && user.empid) {
      axios.get(`https://employee-management-system-backend-1-dd4q.onrender.com/findleavesbyempid?empid=${user.empid}`)
        .then((response) => {
          setLeaves(response.data);
        })
        .catch(() => {
          alert("Error fetching leave records");
        });
    }
  }, [user]);

  let cancelLeave = (leaveid) => {
    if (window.confirm("Are you sure you want to cancel this leave?")) {

      axios.delete(`https://employee-management-system-backend-1-dd4q.onrender.com/cancelleave?leaveid=${leaveid}`)
        .then((response) => {
          alert(response.data);
          setLeaves(prevLeaves =>
            prevLeaves.filter(l => l.leaveid !== leaveid)
          );
        })
        .catch(() => {
          alert("Error deleting leave");
        });
    }
  };

  const handleUpdateClick = (leave) => {
    setSelectedLeave({ ...leave });
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedLeave(null);
  };

  const handleUpdateSubmit = () => {

    if (!selectedLeave.fromdate || !selectedLeave.todate || !selectedLeave.reason) {
      alert("Please fill all fields");
      return;
    }

    if (new Date(selectedLeave.fromdate) > new Date(selectedLeave.todate)) {
      alert("From date cannot be after To date");
      return;
    }

    axios.put(
      `https://employee-management-system-backend-1-dd4q.onrender.com/updateleave?leaveid=${selectedLeave.leaveid}`,
      selectedLeave
    )
      .then((response) => {

        alert(response.data);

        setLeaves(prevLeaves =>
          prevLeaves.map(l =>
            l.leaveid === selectedLeave.leaveid ? selectedLeave : l
          )
        );

        setShow(false);
        setSelectedLeave(null);
      })
      .catch(() => {
        alert("Error updating leave");
      });
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">My Leave Records</h3>

      <table className="table table-bordered table-striped text-center">
        <thead className="table-dark">
          <tr>
            <th>leave id</th>
            <th>emp id</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leaves.length > 0 ? (
            leaves.map((leave) => (
              <tr key={leave.leaveid}>
                <td>{leave.leaveid}</td>
                <td>{leave.employee?.empid}</td>
                <td>{leave.fromdate}</td>
                <td>{leave.todate}</td>
                <td>{leave.reason}</td>
                <td>
                  <span className={`badge 
                    ${leave.status === "approved" ? "bg-success" :
                      leave.status === "rejected" ? "bg-danger" :
                        "bg-warning text-dark"}`}>
                    {leave.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleUpdateClick(leave)}
                    disabled={leave.status !== "pending"}
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => cancelLeave(leave.leaveid)}
                    disabled={leave.status !== "pending"}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No leave records found</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedLeave && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Leave</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <input
              type="date"
              className="form-control mb-3"
              value={selectedLeave.fromdate || ""}
              onChange={(e) =>
                setSelectedLeave({
                  ...selectedLeave,
                  fromdate: e.target.value
                })
              }
            />

            <input
              type="date"
              className="form-control mb-3"
              value={selectedLeave.todate || ""}
              onChange={(e) =>
                setSelectedLeave({
                  ...selectedLeave,
                  todate: e.target.value
                })
              }
            />

            <textarea
              className="form-control"
              value={selectedLeave.reason || ""}
              onChange={(e) =>
                setSelectedLeave({
                  ...selectedLeave,
                  reason: e.target.value
                })
              }
            />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

            <Button variant="primary" onClick={handleUpdateSubmit}>
              Update Leave
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}