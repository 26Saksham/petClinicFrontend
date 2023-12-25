import React from 'react';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './UserDashboardnavbar.css';
import VaccineHistory from '../Vaccine_History/VaccineHistory';
import UserDashboard from '../UserDashBoard/UserDashBoard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCirclePlus, faHistory, faHome, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import BookAppointment from '../BookAppointment/BookAppointment';
import { DataContext } from '../../Context/DataContext';
import { useNavigate } from "react-router-dom";
const UserDashboardnavbar=()=>{
    return(
        <div>

                <NavBarItem />
    

        </div>
    )
}

const NavBarItem = () => {
  
    const {  UserData ,setIsAuthenticated,setUserData} = React.useContext(DataContext);

   const [NavigateComponent,setNavigateComponent]=React.useState("UserDashboard");
   const navigate = useNavigate();
   if((Object.keys(UserData).length)!==0){
    return (
    <div className='UserDashBoardNavbarContainer'>
        <Row>
            <Col xs lg="2" className='DashBoardNavbar'>
                <div>
                <div className='DashBoardNavbarLinks'> <div className="userNameIcon"><FontAwesomeIcon  icon={faUser}/> {UserData.data.Name}</div></div>
                <div onClick={()=>{setNavigateComponent("UserDashboard")}} className='DashBoardNavbarLinks'>DashBoard <FontAwesomeIcon icon={faHome} /></div>
                <div onClick={()=>setNavigateComponent("VaccineHistory")} className='DashBoardNavbarLinks'>Appointment History <FontAwesomeIcon icon={faHistory}/></div>
                {/* <div  className='DashBoardNavbarLinks'>Reports</div>
                <div  className='DashBoardNavbarLinks'>Prescriptions</div>
                <div  className='DashBoardNavbarLinks'>Invoices</div> */}

                </div>
               <div>
               <div onClick={()=>{setNavigateComponent("BookAppointment")}} className='DashBoardNavbarLinks'>Book Appointment<FontAwesomeIcon icon={faCirclePlus}/></div>
               </div>
               <div>
               <div onClick={()=>{setIsAuthenticated(false);setUserData({});navigate('/')}} className='DashBoardNavbarLinks'>Sign out <FontAwesomeIcon icon={faSignInAlt}/></div>
               </div>
            </Col>
            <Col style={{ width: "80%"}} className='rightHandContainer'>
            {NavigateComponent==="UserDashboard" && <UserDashboard/>}
    
                {NavigateComponent==="VaccineHistory" && <VaccineHistory/>}
                {
                NavigateComponent==="BookAppointment" &&<BookAppointment/>}
         
            </Col>

        </Row>
    </div>
    );
                }
                else{
                    return(
                        <h1>
                            Please Login First 
                        </h1>
                    )
                }
  };
export default UserDashboardnavbar;
