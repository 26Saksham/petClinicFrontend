import React from 'react';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faBookMedical, faCirclePlus, faHistory, faHome, faSignOut, faUser, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import DoctorProfile from '../DoctorProfile/DoctorProfile';
import AppointmentDetails from '../AppointmentDetails/AppointmentDetails';
import { DataContext } from '../../Context/DataContext';
import AddPatient from '../AddPatient/AddPatient';
import VaccineHistory from '../VaccineHistory/VaccineHistory';
import AddVaccine from '../AddVaccine/AddVaccine';
import { useNavigate } from "react-router-dom"; //// used for navigation from one page to another
import AppointmentHistory from '../AppointmentHistory/AppointmentHistory';
import './DoctorDashboardNavbar.css'
import VaccineSchedule from '../VaccineSchedule/VaccineSchedule';
const DoctorDashboardNavbar=()=>{
   



    return(
        <div>
      <NavBarItem/>
        </div>
    )
}
const NavBarItem = () => {

    const navigate = useNavigate();
    const {UserData,setIsAuthenticated,setUserData}=React.useContext(DataContext)
    const [NavigateComponent,setNavigateComponent]=React.useState("Profile");
  console.log(UserData)
    if((Object.keys(UserData).length)!==0){
        return (
            <div className='UserDashBoardNavbarContainer'>
                <Row>
                    <Col xs lg="2" className='DashBoardNavbar '>
                        <div>
                            <div >
                        <div className='Profile'> <FontAwesomeIcon  className='NavBarIcons ' icon={faUser}/> {UserData.data.Name}</div>
                        <hr/>
                        <div onClick={()=>{setNavigateComponent("Profile")}} className='DashBoardNavbarLinks '>Profile <FontAwesomeIcon  className='NavBarIcons'  icon={faUserDoctor} /></div>
                        <div onClick={()=>{setNavigateComponent("AppointmentDetails")}} className='DashBoardNavbarLinks'>Appointment Details <FontAwesomeIcon  className='NavBarIcons' icon={faBookMedical} /></div>
                        <div onClick={()=>{setNavigateComponent("AppointmentHistory")}} className='DashBoardNavbarLinks'>Appointment History <FontAwesomeIcon   className='NavBarIcons' icon={faHistory} /></div>
                 
                        <div onClick={()=>{setNavigateComponent("AddPatient")}} className='DashBoardNavbarLinks'>Add Patient  <FontAwesomeIcon   className='NavBarIcons' icon={faAdd} /></div>
                      
                        <div onClick={()=>{setNavigateComponent("VaccineHistory")}} className='DashBoardNavbarLinks'>VaccineHistory  <FontAwesomeIcon   className='NavBarIcons' icon={faAdd} /></div>
                    
                        <div onClick={()=>{setNavigateComponent("AddVaccine")}} className='DashBoardNavbarLinks'>AddVaccine  <FontAwesomeIcon   className='NavBarIcons' icon={faAdd} /></div>
                     
                        <div onClick={()=>{setNavigateComponent("VaccineSchedule")}} className='DashBoardNavbarLinks'>Vaccine Schedule  <FontAwesomeIcon   className='NavBarIcons' icon={faAdd} /></div>
                        
                        
                        
                        </div>

                      <div className='signOutButton'>
                      
                      <div  onClick={()=>{setIsAuthenticated(false);setUserData({});navigate('/')}} className='DashBoardNavbarLinks'>Sign Out <FontAwesomeIcon  className='NavBarIcons' icon={faSignOut} /></div>
                      </div>
                      
                    
                        </div>
                  
                    </Col>
                    <Col style={{ width: "80%"}} className='rightHandContainer'>
                    {NavigateComponent==="Profile" && <DoctorProfile/>}
                    {NavigateComponent==="AppointmentDetails" && <AppointmentDetails/>}
                    {NavigateComponent==="AppointmentHistory" && <AppointmentHistory/>}
                    {NavigateComponent==="AddPatient" && <AddPatient/>}
                    {NavigateComponent==="VaccineSchedule" && <VaccineSchedule/>}


                    
                    
                    {/*This is my area-------------yrb*/}
                    {NavigateComponent==="AddVaccine" && <AddVaccine/>}
                    {NavigateComponent==="VaccineHistory" && <VaccineHistory/>}
                 
             

                 
                    </Col>
        
                </Row>
            </div>
            );
    }
    else{
     return(
        <h1>Please Login first</h1>
     )
    }
    
   };
export default DoctorDashboardNavbar;