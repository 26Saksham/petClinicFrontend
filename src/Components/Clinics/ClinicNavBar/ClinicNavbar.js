
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { DataContext } from '../../Context/DataContext';
import { useNavigate } from "react-router-dom"; //// used for navigation from one page to another
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookMedical, faDashboard, faSignOut, faUserCheck, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import ClinicDoctors from '../ClinicDoctors/ClinicDoctors';
import ClinicProfile from '../ClinicProfile.js/ClinicProfile';
import ClinicDashBoard from '../ClinicDashboard/ClinicDashboard';
import Patients from '../Patients/Patients';
const ClinicNavbar=()=>{

    return(
        <div>
      <NavBarItem />

        </div>
    )
}



const NavBarItem = () => {
    
    const navigate = useNavigate();
    const {UserData,setIsAuthenticated,setUserData}=React.useContext(DataContext)
    const [NavigateComponent,setNavigateComponent]=React.useState("ClinicProfile");
  const handleSignout=()=>{
    setIsAuthenticated(false);
    setUserData({});
    localStorage.removeItem("token");
    navigate('/');
  }
 
  console.log(UserData)
    if((Object.keys(UserData).length)!==0){
        return (
            <div className='UserDashBoardNavbarContainer'>
                <Row>
                    <Col xs lg="2" className='DashBoardNavbar '>
                        <div>
                     <div>{UserData.data.Name}</div>
                     <div onClick={()=>{setNavigateComponent("ClinicProfile")}} className='DashBoardNavbarLinks '>Profile <FontAwesomeIcon  className='NavBarIcons'  icon={faUserCheck} /></div>
                     <div onClick={()=>{setNavigateComponent("Doctors")}} className='DashBoardNavbarLinks '>Doctors <FontAwesomeIcon  className='NavBarIcons'  icon={faUserDoctor} /></div>
                     <div onClick={()=>{setNavigateComponent("DashBoard")}} className='DashBoardNavbarLinks '>DashBoard <FontAwesomeIcon  className='NavBarIcons'  icon={faBookMedical} /></div>
                        
                     <div onClick={()=>{setNavigateComponent("Patient")}} className='DashBoardNavbarLinks '>Patients <FontAwesomeIcon  className='NavBarIcons'  icon={faBookMedical} /></div>
                        
                        
                        </div>
                        <div className='signOutButton'>
                            <Button onClick={handleSignout}>Sign Out <FontAwesomeIcon icon={faSignOut}/></Button>
                        </div>
                  
                    </Col>
                    <Col >
                   
                    <h3>Welcome to {UserData.data.Name}</h3>
               {NavigateComponent==='ClinicProfile' && <ClinicProfile />}
               {NavigateComponent==='Doctors' && <ClinicDoctors />}
               {NavigateComponent==='DashBoard' && <ClinicDashBoard />}
               {NavigateComponent==='Patient' && <Patients />}

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

export default ClinicNavbar;