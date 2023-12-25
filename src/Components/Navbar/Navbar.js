import React from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Home from '../Home/Home.js';
import UserDashboardnavbar from "../UserDashBoard/UserDashboardNavbar/UserDashboardnavbar.js"
import DoctorDashboardNavbar from "../DoctorDashBoard/DoctorDashboardNavbar/DoctorDashboardNavbar.js";
import './Navbar.css';
import Login   from "../Login/Login.js";
import { faDog, faShoePrints, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../Context/DataContext.jsx";
import { Button } from "@mui/material";
import ClinicNavbar from "../Clinics/ClinicNavBar/ClinicNavbar.js";
import { BASEURL } from "../../BaseUrl.js";
import { getAccessToken } from "../../utlis.js";
import RequestActivateDoctor from "../Clinics/RequestActivateDoctor/RequestActivateDoctor.js";
const Navbar=()=>{
const [succes,setSuccess]=React.useState(false);
  const { setIsAuthenticated,isAuthenticated, UserData ,setUserData} = React.useContext(DataContext);
  React.useEffect(()=>{
    fetch(`${BASEURL}/VerifyToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token:getAccessToken()}),
    })
      .then((response) => response.json())
      .then((data) => {
   
       if(data.success){
        setSuccess(true);
        setIsAuthenticated(true);
      
        setUserData({data:data.data,As_A:data.data.As_A});
       }
     
      })
      .catch((error) => {

      });
  },[])

        return (
            <div>
              <BrowserRouter>
                <NavBarItem succes={succes} />
        
                <Routes>
                  {succes}
                  <Route exact path="/" element={<Home />} />
                 {<Route exact path="/LoginSignup" element={<Login/>}/>}
                 {isAuthenticated===true && <Route exact path="/userDashboard" element={<UserDashboardnavbar/>} />}
                 {isAuthenticated===true && <Route exact path="/DoctorDashboard"  element={<DoctorDashboardNavbar/>}/>}
                 {isAuthenticated===true && <Route exact path="/ClinicAdminstration"  element={<ClinicNavbar/>}/>}
                 {isAuthenticated===true && <Route exact path="/RequestActivateDoctor"  element={<RequestActivateDoctor/>}/>}

                 
                </Routes>
              </BrowserRouter>
            </div>
          );
        }
    
        const NavBarItem = ({succes}) => {
          const { isAuthenticated, UserData } = React.useContext(DataContext);
          console.log(UserData)
         if(UserData){
          return (
            <div>
<div class="nav">
<input type="checkbox" id="nav-check" />
<div class="nav-header">
  <div class="nav-title">
    <Link to="/">
    <FontAwesomeIcon icon={faDog}/>   Vet-World
    </Link>

  </div>
</div>
<div class="nav-btn">
  <label for="nav-check">
    <span></span>
    <span></span>
    <span></span>
  </label>
</div>

<div class="nav-links">
<button className="NavbarButton">
<Link  to="/">
          Home
        </Link>
        </button> 
      
    {isAuthenticated===true && UserData.As_A==='P'  && 
    <button className="NavbarButton">
    <Link  to="/userDashboard">
          DashBoard
        </Link>
        </button>}
 {     isAuthenticated===false &&
       <button className="NavbarButton"> <Link  to="/LoginSignup">
        Login <FontAwesomeIcon icon={faSignInAlt}/>
        </Link>
        </button>}
   {isAuthenticated===true && UserData.As_A==='D' && UserData.Activate==true &&       <button className="NavbarButton">  <Link to="DoctorDashboard">
          DoctorDashBoard
        </Link>
        </button>
        }
 {isAuthenticated===true && UserData.As_A==='D' && UserData.Activate==false &&    <button className="NavbarButton">  <Link to="RequestActivateDoctor">
 Request Activate Doctor
        </Link>
        </button>
        }
{isAuthenticated==true && UserData.As_A==='C'  &&       <button className="NavbarButton">  <Link to="ClinicAdminstration">
          Clinic Admin
        </Link>
        </button>
        }
</div>
</div>
      </div>
          );
         }
           else{
            return(
              <div>{succes}</div>
            )
           }
          };
          
          export default Navbar;
          