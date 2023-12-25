import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from 'react-bootstrap/Table';
import { BASEURL } from "../../../BaseUrl";
import React from "react";
import './UserDashBoard.css';
import { DataContext } from "../../Context/DataContext";
const getAppointmentWithDoctorName=(id)=>{
  var promise=new Promise((resolve,rejects)=>{
    fetch(`${BASEURL}/getAppointmentWithDoctorName`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({PatientId:id}),
    })
      .then((response) => response.json())
      .then((data) => {
  resolve(data);
  })
      .catch((error) => {
        rejects(error);
      });
  })
  return promise;
}

const UserDashboard=()=>{
  const [AppointmentDataWithDoctor,setAppointmentDataWithDoctor]=React.useState([])
  const {UserData}=React.useContext(DataContext)
  React.useEffect(()=>{
    getAppointmentWithDoctorName(UserData.data._id).then((res)=>{
      if(res.success){
    
        setAppointmentDataWithDoctor(res.response);
      }
    }).then((error)=>{
  console.log(error)
    })

  },[])
    return(
      <div>
        <h3 className="DashBoardHeadingDiv"><div className="DashBoardHeading"><FontAwesomeIcon className='icons' icon={faHome}/> DashBoard</div> </h3>
<PetRecords AppointmentDataWithDoctor={AppointmentDataWithDoctor}/>
      </div>
    )
};
const PetRecords=({AppointmentDataWithDoctor})=>{
  return(
    <div>
      <h1>Appointment Scheduled</h1>
 <Table striped>
      <thead>
        <tr>
          <th>Pet Name</th>
          <th>Breed</th>
          <th>Doctor Name</th>
          <th>Appointment Date</th>
          <th>Appointment Time</th>
        </tr>
      </thead>
      <tbody>
        {
          AppointmentDataWithDoctor.map((Appointment)=>{
            return(
              <tr>
              <td>{Appointment.PetName}</td>
              <td>{Appointment.Breed}</td>

              <td>{Appointment.DoctorId}</td>
              <td>{Appointment.AppointmentBookingDate}</td>
              <td>{Appointment.AppointmentBookingTime}</td>
            </tr>
            )
          })
        }
       
     
      </tbody>
    </Table>
    </div>
  )
}

export default UserDashboard;