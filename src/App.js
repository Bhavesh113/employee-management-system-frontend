import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AddEmployee from './AddEmployee';
import GetEmployee from './GetEmployee';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Aboutus from './Aboutus';
import Contactus from './Contactus';
import Home from './Home';
import AdminDashboard from './AdminDashboard';
import Services from './Services';
import EmployeeDashboard from './EmployeeDashboard';
import RegisterUser from './RegisterUser';
import LeaveApply from './LeaveApply';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import EmpNav from './EmpNav';
import ViewLeaveStatus from './ViewLeaveStatus';
import UpdateLeaveStatus from './UpdateLeaveStatus';

function App() {
  return (
  <div>
        <BrowserRouter>
        
        <AppContent></AppContent>
        </BrowserRouter>
     </div>
    
  );
}

export default App;

function AppContent(){
let location= useLocation();
//location.pathname
let user=(JSON.parse(localStorage.getItem("userinfo")))
let isLoggedIn=(JSON.parse(localStorage.getItem("IsLoggedIn")))
  return(
    <div>
      {
      isLoggedIn===true && location.pathname!=="/register" &&
      (user.role==="ADMIN"?<Navbar></Navbar>:<EmpNav></EmpNav>)
      }
      <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/about" element={<Aboutus></Aboutus>}></Route>
          <Route path="/contact" element={<Contactus></Contactus>}></Route>
          <Route path="/services" element={<Services></Services>}></Route>
          <Route path="/viewemp" element={<GetEmployee></GetEmployee>}></Route>
          <Route path="/addemp" element={<AddEmployee></AddEmployee>}></Route>
          <Route path="/admindashboard" element={<AdminDashboard></AdminDashboard>}></Route>
          <Route path="/employeedashboard" element={<EmployeeDashboard></EmployeeDashboard>}></Route>
          <Route path="/register" element={<RegisterUser></RegisterUser>}></Route>
          <Route path="/viewleavestatus" element={<ViewLeaveStatus></ViewLeaveStatus>} />
          <Route path="/updateleavestatus" element={<UpdateLeaveStatus></UpdateLeaveStatus>} />
          <Route path="/leaveapply" element={<LeaveApply></LeaveApply>}></Route>
        </Routes>
    </div>

  )
}
