import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleLeft, faCircle, faLocation, faLocationArrow, faLocationCrosshairs, faMapLocation, faTag, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import { Col, Container, Row } from "react-bootstrap";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { TextField  } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BASEURL } from "../../../BaseUrl";
import { DataContext } from '../../Context/DataContext';
import './AppointmentDetails.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
const convertDateFormat=(dateString)=>{
  var date = new Date(dateString.toString().replace('IST', ''));

let day = date.getDate();
let month = date.getMonth()+1;
let year = date.getFullYear();

return year+"-"+month+"-"+day;
}
const GetAppointmentDetailsServer=(data)=>{
  const promise=new Promise((resolve,reject)=>{

    fetch(`${BASEURL}/getAppointmentDetials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((res) => {
      if (!res.ok) throw Error("Internal Server Error");
      return res.json();
    })
    .then((res) => {
   
      resolve(res);
    })
    .catch((error) => {
      reject(error);
    });
});
  return promise;
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#DFF6FF",
    color: "#06283D",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const AppointmentDetails=()=>{
  const [detailsVisible,setDetailsVisible]=React.useState(false);
  const [AppointmentDetailsAfterToday,setAppointmentDetailsAfterToday]=React.useState([]);
  const [AppointmentDetailsToday,setAppointmentDetailsToday]=React.useState([]);
const [AppointmentDetailsAfterClickEdit,setAppointmentDetailsAfterClickEdit]=React.useState({});
const {UserData}=React.useContext(DataContext)

React.useEffect(()=>{

  var data={
    DoctorId:UserData.data._id
  }
  GetAppointmentDetailsServer(data).then((res)=>{

    if(res.success){
    if(res.data){
 
      var resultToday=[],resultAfter=[]
      res.data.forEach((appointment)=>{
        if(isDateToday(appointment.AppointmentBookingDate)){
          resultToday.push(appointment);
        }
        else {
          resultAfter.push(appointment)
     
        }
      })
    }
console.log("result ",res.data)
    setAppointmentDetailsToday(resultToday);
          setAppointmentDetailsAfterToday(resultAfter)
    }
  }).then((error)=>{
  
    console.log(error)
  })
},[UserData,GetAppointmentDetailsServer])

  const handleDetailsVisible=(target,appointment)=>{
    setDetailsVisible(target);
    setAppointmentDetailsAfterClickEdit(appointment);
  }
 
  function isDateToday(dateString) {
   return convertDateFormat(new Date())===dateString;
  }



if(UserData){
  return(
    <div>
{detailsVisible===false && <TodayAppointments handleDetailsVisible={handleDetailsVisible} AppointmentDetailsToday={AppointmentDetailsToday}/> }
{detailsVisible===false && <UpCommingAppointments handleDetailsVisible={handleDetailsVisible} AppointmentDetailsAfterToday={AppointmentDetailsAfterToday}/>}
{detailsVisible && <FullAppointmentDetail handleDetailsVisible={handleDetailsVisible} AppointmentDetailsAfterClickEdit={AppointmentDetailsAfterClickEdit}/>}
    </div>
)
}
else{
<h6>Refresh the Page or wait </h6>
}

   
}
const TodayAppointments=({handleDetailsVisible,AppointmentDetailsToday})=>{

const  handleEditButton=(appointment)=>{
    handleDetailsVisible(true,appointment);
  }
  console.log(AppointmentDetailsToday)

  if(AppointmentDetailsToday===undefined){
    return(
      <div>
<h1>Loading...</h1>
      </div>
    )
  }
  else if(AppointmentDetailsToday.length===0){
    return(
      <div>
<h1>No Appointments</h1>
      </div>
    )
  }
  else{
    return(
      <div className="TodayAppointmentDiv">
     <div className="TodayAppHeading AnimationTableTop">Today Appointment</div>
     <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
           
                <StyledTableCell align="left">Pet Name</StyledTableCell>
                <StyledTableCell>Pet Owner Name</StyledTableCell>
                <StyledTableCell>Appointment Date</StyledTableCell>
                <StyledTableCell>Appointment Time Slot</StyledTableCell>
                <StyledTableCell>Details</StyledTableCell>

              </TableRow>
            </TableHead>
            <TableBody>
            {
            AppointmentDetailsToday.map((appointment)=>{
return(
<StyledTableRow key={appointment.AppointmentID}>
<StyledTableCell>
{appointment.PetName}
                  </StyledTableCell>
<StyledTableCell>{appointment.PetOwnerName}</StyledTableCell>
<StyledTableCell>{appointment.AppointmentBookingDate}</StyledTableCell>

<StyledTableCell>{appointment.AppointmentBookingTime}</StyledTableCell>

  <StyledTableCell><FontAwesomeIcon onClick={()=>{handleEditButton(appointment)}}icon={faEdit}/></StyledTableCell>
  </StyledTableRow>
)
            })
          }
                
                       
                 
                  
              
     
            </TableBody>
          </Table>
        </TableContainer>

      </div>
    )
  }
    
  }


const UpCommingAppointments=({handleDetailsVisible,AppointmentDetailsAfterToday})=>{
  const  handleEditButton=(appointment)=>{
    handleDetailsVisible(true,appointment);
  }
  if(AppointmentDetailsAfterToday){
    return(
      <div className="UpcommingDiv">
              <div className="UpcommingHeading AnimationTableTop">Up Comming Appointments</div>
        {
                AppointmentDetailsAfterToday.length!==0 &&
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                 
                      <StyledTableCell align="left">Pet Name</StyledTableCell>
                      <StyledTableCell>Pet Owner Name</StyledTableCell>
                      <StyledTableCell>Appointment Date</StyledTableCell>
                      <StyledTableCell>Appointment Time Slot</StyledTableCell>
                      <StyledTableCell>Details</StyledTableCell>
      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {
        AppointmentDetailsAfterToday.map((appointment)=>{
      return(
      <StyledTableRow key={appointment.AppointmentID}>
      <StyledTableCell>
      {appointment.PetName}
                        </StyledTableCell>
      <StyledTableCell>{appointment.PetOwnerName}</StyledTableCell>
      <StyledTableCell>{appointment.AppointmentBookingDate}</StyledTableCell>
      
      <StyledTableCell>{appointment.AppointmentBookingTime}</StyledTableCell>
      
        <StyledTableCell><FontAwesomeIcon onClick={()=>{handleEditButton(appointment)}}icon={faEdit}/></StyledTableCell>
        </StyledTableRow>
      )
                  })
      
                }
            
                  </TableBody>
                </Table>
              </TableContainer>
        }
        {
          AppointmentDetailsAfterToday.length===0 &&<div className="NoAppointments">
            No Appointments
            </div>
        }

    
         </div>
  )
  }
  else{
    return(
      <div>
        <h2>Some Problem Please Try Again</h2>
      </div>
    )
  }
    
}

  const FullAppointmentDetail=({handleDetailsVisible,AppointmentDetailsAfterClickEdit})=>{
    const {UserData}=React.useContext(DataContext)
    const [formData,setFormData]=React.useState({
      AppointmentId:AppointmentDetailsAfterClickEdit._id,
      petOwnerName:AppointmentDetailsAfterClickEdit.PetOwnerName,
      currentDate:convertDateFormat(new Date()),
      petName:AppointmentDetailsAfterClickEdit.PetName,
      species:AppointmentDetailsAfterClickEdit.Species,
      breed:AppointmentDetailsAfterClickEdit.Breed,
      age:AppointmentDetailsAfterClickEdit.PetAge,
      gender:AppointmentDetailsAfterClickEdit.PetGender,
      weight:AppointmentDetailsAfterClickEdit.petWeight,
      petInformation:AppointmentDetailsAfterClickEdit.petInformation,
      appointmentData:AppointmentDetailsAfterClickEdit.AppointmentBookingDate,
      appointmentTimeSlot:AppointmentDetailsAfterClickEdit.AppointmentBookingTime,
      Temperature:'',
    PulseRate:'',
    HR:'',
    RR:'',
    CRT:'',
    MM:'',
    AllVaccineComplete:'N',
    NextVaccineCycle:0,
    DoctorId:UserData.data._id,
    PatientId:AppointmentDetailsAfterClickEdit.PatientId
  });

function backToDoctorDetails(){
  handleDetailsVisible(false);
}
const [VaccineComplete, setVaccineComplete] = React.useState('N');

const handleChange = (event) => {
  setFormData({...formData,['AllVaccineComplete'] :event.target.value})
  setVaccineComplete(event.target.value);
};
const handleInputChange=(e)=>{
  setFormData({...formData,[e.target.name]: e.target.value})
}
const handleSaveButton=()=>{

//check INput

  fetch(`${BASEURL}/AppointmentSubmitByDoctor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
 if(data.success===true){
    alert("Successfully")
 }
})
    .catch((error) => {
        alert("Server Error,Please wait")
    });
}
if((Object.keys(UserData).length)!==0){


    return(
        <div>
      
            <h4><button className="backButton" onClick={()=>{backToDoctorDetails()}}><FontAwesomeIcon  icon={faArrowCircleLeft} /></button><div className="AppointmentHeading">Appointment Booking</div></h4>
<div>
    <Container>
    <div>
        <Row className="AppointmentBookingRows">
        <Col>
            <TextField fullWidth   disabled    id="filled-required" name='petOwnerName' className="Booked"  value={AppointmentDetailsAfterClickEdit.PetOwnerName}  label="Pet Owner Name" variant="filled" />
            </Col>
            <Col className="dateField">
            <TextField   focused  id="filled-required" disabled  name="Booking Date" className="Booked"   value={AppointmentDetailsAfterClickEdit.CurrentDate} label="Booking Date"  variant="filled" />
            </Col>
    
        </Row>
        </div>  
 <hr/>
 <Row className="AppointmentBookingRows PetInformation Booked"><TextField  disabled   id="filled-read-only-input"  value={AppointmentDetailsAfterClickEdit.petInformation} name='petInformation' label="Pet Information" variant="filled" /> </Row>
<hr/>
        <Row className="AppointmentBookingRows">
            <Col>
            <TextField className="Booked"   focused  disabled   id="filled-read-only-input" value={AppointmentDetailsAfterClickEdit.PetName} name='petName' label="Pet Name" variant="filled" /></Col>
            <Col>
            <TextField  className="Booked"   focused  disabled id="filled-read-only-input" name='species' value={AppointmentDetailsAfterClickEdit.Species}  label="Species" variant="filled" /></Col>

            <Col>
            <TextField  className="Booked"  focused  disabled id="filled-read-only-input" name='breed' value={AppointmentDetailsAfterClickEdit.Breed} label="Breed" variant="filled" />
            </Col>
            <Col>
            <TextField className="Booked"  focused  disabled  id="filled-read-only-input" name='age' value={AppointmentDetailsAfterClickEdit.PetAge} type="number" label="Age"  /></Col>
        </Row>
        <Row className="AppointmentBookingRows">
 
            <Col>
            <FormControl fullWidth className="Booked" >
  <InputLabel id="demo-simple-select-label" >Gender</InputLabel>
  <Select disabled
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={AppointmentDetailsAfterClickEdit.PetGender}
    label="Gender"
    name='gender'
    
  >
    <MenuItem value={"M"}>Male</MenuItem>
    <MenuItem value={"F"}>Female</MenuItem>
  
  </Select>
</FormControl>
            
            </Col>

            <Col>
            <TextField className="Booked"  disabled focused value={AppointmentDetailsAfterClickEdit.petWeight}  name='weight' type="number" label="Weight in Kg." variant="filled" />
            </Col>
            <Col>
        <TextField className="Booked"  disabled focused value={AppointmentDetailsAfterClickEdit.AppointmentBookingDate} name='AppointmentDate' type="text" label="Appointment - Date" variant="filled" />
        
        </Col>
        <Col>
        <TextField className="Booked"  disabled focused value={AppointmentDetailsAfterClickEdit.AppointmentBookingTime} name='Appointment' type="text" label="Appointment - Time" variant="filled" />
        
        </Col>
        </Row>
       <hr/>
       <Row>
        <Col className="TakeInput"><TextField   fullWidth id="filled-basic" onChange={handleInputChange} name='Temperature' type="text" label="Temperature" variant="filled" /></Col>
        <Col className="TakeInput"><TextField  fullWidth id="filled-basic" onChange={handleInputChange} name='PulseRate' type="text" label="Pulse Rate" variant="filled" /></Col>
       
        <Col className="TakeInput"> <TextField   id="filled-basic" onChange={handleInputChange}  name='HR' type="text" label="HR" fullWidth variant="filled" /></Col>
       </Row>
       <Row>
        <Col className="TakeInput"><TextField  id="filled-basic" onChange={handleInputChange}  name='RR' type="text" label="RR" variant="filled" fullWidth/></Col>
        <Col className="TakeInput"> <TextField  id="filled-basic" onChange={handleInputChange}  name='CRT' type="text" label="CRT" variant="filled" fullWidth/></Col>
        <Col className="TakeInput"><TextField  id="filled-basic" onChange={handleInputChange}  name='MM' type="text" label="MM" variant="filled" fullWidth/></Col>
       </Row>
       <Row>
      <Col className="TakeInput">
      <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Vaccine Complete</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={VaccineComplete}
    label="Vaccine Complete"
    onChange={handleChange}
  >
    <MenuItem value="Y">YES</MenuItem>
    <MenuItem value="N">NO</MenuItem>
  </Select>
</FormControl>
</Col>
      {VaccineComplete==="N" && <Col className="TakeInput"><TextField  id="filled-basic" onChange={handleInputChange}  name='NextVaccineCycle' type="Number" label="Next Vaccine Cycle" variant="filled" /></Col>}
      <Col className="TakeInput"><button  className="DoctorSaveButton" onClick={()=>{handleSaveButton()}}>Save</button></Col>  
       </Row>
    </Container>
</div>
        </div>
    )
}
  }
export default AppointmentDetails;