import { faArrowCircleLeft, faCircle, faLocation, faLocationArrow, faLocationCrosshairs, faMapLocation, faTag, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { parseISO, format } from 'date-fns';
import Nav from 'react-bootstrap/Nav';
import './BookAppointment.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Col, Container, Row } from "react-bootstrap";
import doctor  from './doctor_image.jpg'
import { TextField  } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DatePicker from "react-horizontal-datepicker";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { BASEURL } from "../../../BaseUrl";
import { DataContext } from "../../Context/DataContext";
import { ToastContainer ,toast} from "react-toastify";
const DoctorImages= require.context("./");


const getALLDoctorInformationAPI=()=>{
    const promise = new Promise((resolve, reject) => {
        fetch(`${BASEURL}/getAllDoctorInformation`)
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


const BookAppointment=()=>{
  
    const [SelectDoctorDetails,SetSelectDoctorDetails]=React.useState(false);
    const [AppointmentBooking,SetAppointmentbooked]=React.useState(false);
    const [AllDoctorInformation,setAllDoctorInformation]=React.useState([]);
const [DoctorDetailObj,setDoctorDetailObj]=React.useState({});
const [doctorId,setDoctorId]=React.useState('');
const [DoctorTime,setDoctorTime]=React.useState({});
React.useEffect(()=>{
    getALLDoctorInformationAPI().then((result)=>{
        if(result.success){
            setAllDoctorInformation(result.data);
        }

    }).then((error)=>{

    })
},[])
function paymentButtonClicked(AppointmentDetailsData){
    

    fetch(`${BASEURL}/AppointmentBookingUserEnd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(AppointmentDetailsData),
      })
        .then((response) => response.json())
        .then((data) => {
     if(data.success===true){
        toast("Successfully")
     }
    })
        .catch((error) => {
            toast("Server Error,Please wait")
        });

}
    function DoctorDetils(target,DoctorDetailInfo){
        SetSelectDoctorDetails(target);
        setDoctorDetailObj(DoctorDetailInfo)
    }
    function AppointmentBooked(target,doctorId,TimeSlotStart,TimeSlotEnd){
        SetSelectDoctorDetails(false)
        SetAppointmentbooked(target);
 
    setDoctorTime({TimeStart:TimeSlotStart,TimeEnd:TimeSlotEnd})
        setDoctorId(doctorId)
    }
    return(
        <div>
            
            {SelectDoctorDetails===false && AppointmentBooking==false &&
            <SelectDoctorNavigation DoctorDetils={DoctorDetils} AppointmentBooked={AppointmentBooked} AllDoctorInformation={AllDoctorInformation}/>}
            {SelectDoctorDetails && <DoctorDetails  DoctorDetils={DoctorDetils} AppointmentBooked={AppointmentBooked} DoctorDetailObj={DoctorDetailObj}/>}
            {AppointmentBooking && <BookAppointmentDoctor AppointmentBooking={AppointmentBooked} paymentButtonClicked={paymentButtonClicked} doctorId={doctorId} DoctorTime={DoctorTime}/>}
    <ToastContainer/>
        </div>
    )
}
const SelectDoctorNavigation=({DoctorDetils,AppointmentBooked,AllDoctorInformation,doctorId})=>{
    const [Navigation,setNavigation]=React.useState("Avilable");
    const handleChange = (event, newAlignment) => {
        setNavigation(newAlignment);
    };
    return(
        <div>
<Container>
<h3 className="BookAppointmentHeading">Select a Doctor <FontAwesomeIcon icon={faUserDoctor}/> </h3>
    <Row className="NavigationDoctorRow">
        
    <ToggleButtonGroup
      color="primary"
      value={Navigation}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
     
      <ToggleButton className="NavigationButtonDoctorDetails" value="Avilable">Available Doctor</ToggleButton>
      <ToggleButton  className="NavigationButtonDoctorDetails" value="AllDoctor">All Doctor</ToggleButton>
  
    </ToggleButtonGroup>
    </Row>
    <Row>
{Navigation==="Avilable" && <AvilableDoctor DoctorDetils={DoctorDetils} AppointmentBooked={AppointmentBooked} AllDoctorInformation={AllDoctorInformation}/>}
{Navigation==="AllDoctor" && <AllDoctor  DoctorDetils={DoctorDetils} AppointmentBooked={AppointmentBooked} AllDoctorInformation={AllDoctorInformation} />}

    </Row>
</Container>
        </div>
    )
}
const AvilableDoctor=({DoctorDetils,AppointmentBooked,AllDoctorInformation})=>{

    const CheckDoctorTimeAndCurrentTime=(startTime,endTime)=>{

        var currentDate = new Date()   
        var startDate,endDate;
        startDate = new Date(currentDate.getTime());
    
        startDate.setHours(startTime.split(":")[0]);
        startDate.setMinutes(startTime.split(":")[1]);
        startDate.setSeconds(startTime.split(":")[2]);
       
        endDate = new Date(currentDate.getTime());
        endDate.setHours(endTime.split(":")[0]);
        endDate.setMinutes(endTime.split(":")[1]);
        endDate.setSeconds(endTime.split(":")[2]);
        
      
        return startDate <= currentDate && endDate >= currentDate
        
        }

    const LearnAboutDoctor=(DoctorId)=>{
        DoctorDetils(true,DoctorId);

    }
 const AppointmentBooking=(id,TimeSlotStart,TimeSlotEnd)=>{
    AppointmentBooked(true,id,TimeSlotStart,TimeSlotEnd);
 }
    return(
        <div>
<h2 className="Avilableheading">Available Doctor </h2>

<div className="DoctorContainers">
{
            AllDoctorInformation.map((Doctor)=>{
                if(CheckDoctorTimeAndCurrentTime(Doctor.AvailableTimeSlotStart,Doctor.AvailableTimeSlotEnd)){
                    return(
                        <div className="InsideDoctorContainers">
    <Card sx={{ maxWidth: 345 }} className="doctorDetailCard" id={Doctor._id}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={doctor}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
             {Doctor.Name} <FontAwesomeIcon className="onlineDoctor" icon={faCircle} />
            </Typography>
            <Typography variant="body2" color="text.secondary">
        {Doctor.Education[0]}
            </Typography>
            <Typography gutterBottom variant="body3" component="div">
            
                <Container>
                     <Row>
                    Time : {Doctor.AvailableTimeSlotStart} - {Doctor.AvailableTimeSlotEnd}
                </Row>
                    <Row>
                        <Col>{Doctor.Experience} year Exp.</Col>
                        <Col>{Doctor.City} <FontAwesomeIcon icon={faLocation}/></Col>
                    </Row>
                    <Row>
                        <Col>Fees :- {Doctor.Fees}</Col>
                      <Col>Discount:{Doctor.Offer}%</Col>
    
                    </Row>
                </Container>
        
            </Typography>    
          </CardContent>
          <CardActions>
            <Button size="small" onClick={()=>{
        AppointmentBooking(Doctor._id,Doctor.AvailableTimeSlotStart,Doctor.AvailableTimeSlotEnd)
            }} >Book Appointment</Button>
            <Button size="small" onClick={()=>{
                LearnAboutDoctor(Doctor);
            }}>Learn More</Button>
          </CardActions>
        </Card>
                            </div>
                    )
                }
               
            })
           
          }
           </div>
        </div>
    )
}
const AllDoctor=({DoctorDetils,AppointmentBooked,AllDoctorInformation})=>{
    const LearnAboutDoctor=(DoctorId)=>{
        DoctorDetils(true,DoctorId);

    }
 const AppointmentBooking=(id,TimeSlotStart,TimeSlotEnd)=>{
    AppointmentBooked(true,id,TimeSlotStart,TimeSlotEnd);
 }
    return(
        <div >
          <h2 className="Avilableheading">All Doctor</h2>  
          <div className="DoctorContainers">
          {
            AllDoctorInformation.map((Doctor)=>{
                return(
                    <div className="InsideDoctorContainers">
<Card sx={{ maxWidth: 345 }} className="doctorDetailCard" id={Doctor._id}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={doctor}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {Doctor.Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
    {Doctor.Education[0]}
        </Typography>
        <Typography gutterBottom variant="body3" component="div">
        
            <Container>
                <Row>
                    <Col>{Doctor.Experience} year Exp.</Col>
                    <Col>{Doctor.City} <FontAwesomeIcon icon={faLocation}/></Col>
                </Row>
                <Row>
                    Time : {Doctor.AvailableTimeSlotStart} - {Doctor.AvailableTimeSlotEnd}
                </Row>
                <Row>
                 <Col>Fees : {Doctor.Fees}</Col>
                  <Col>Discount:{Doctor.Offer}%</Col>   
                </Row>

            </Container>
    
        </Typography>    
      </CardContent>
      <CardActions>
            <Button size="small" onClick={()=>{
      AppointmentBooking(Doctor._id,Doctor.AvailableTimeSlotStart,Doctor.AvailableTimeSlotEnd)
            }} >Book Appointment</Button>
            <Button size="small" onClick={()=>{
                LearnAboutDoctor(Doctor);
            }}>Learn More</Button>
          </CardActions>
    </Card>
                        </div>
                )
            })
          }
            </div>
        </div>
    )
}
const DoctorDetails=({DoctorDetils,AppointmentBooked,DoctorDetailObj})=>{
    const handleAppointmentBooking=()=>{
        AppointmentBooked(true);
     }
    function backToDoctorDetails(){
        DoctorDetils(false); 
    }
    if(DoctorDetailObj){
        return(
       
            <div>
                <h4><Button onClick={()=>{backToDoctorDetails()}}><FontAwesomeIcon icon={faArrowCircleLeft} /></Button><div>Doctor Detail</div></h4>
               
               
               <Container>
                <Row className="DoctorDetailsBackgroungImage">
                    <div className="doctor_image_container">
                    <img  className='doctor_image' src={DoctorImages("./doctor_image.jpg")}
    />  
                    </div>
                 </Row>
                <Row>
                <Col style={{margin: "auto",
        textAlign: "center"}}>
                <button  className="AppointmentBookDoctorDetailButton" onClick={()=>{handleAppointmentBooking()}}>Book Appointment</button>
          
     
      
                </Col>
            <Col xs={6}>
                <Row>
                <div>{ DoctorDetailObj.Name}</div>
                <div>{DoctorDetailObj.City} <FontAwesomeIcon icon={faMapLocation}/></div>
                </Row>
                <Row>
                    <Col>
                    <h4>Area of Expertise</h4>
                    <ul>
                        <li>{ DoctorDetailObj.AreaOfExpertise[0]}</li>
                    {
                    DoctorDetailObj.AreaOfExpertise.length>1 && <li>{DoctorDetailObj.AreaOfExpertise[1]}</li>
                    }  
                        
                    </ul>
                    </Col>  
    
                </Row>
                
            </Col>
            <Col>Experince {DoctorDetailObj.Experience}+ yr
            </Col>
                </Row>
                <Row>
                    <h4>About Me</h4>
                    <div>{DoctorDetailObj.Profile}</div>
                </Row>
                <Row>
                    <h4>Contact</h4>
                    <ul>
                       
                        {
                            DoctorDetailObj.Contact.map((Mobilenumber,index)=>{
                                return(
                                    <li id={index}>{Mobilenumber}</li>
                                )
                            })
                        }
                    </ul>
                </Row>
                <Row>
                    <h4>Areas of Expertise</h4>
                    <ul className="areaOfExpertie">
              
               {
                            DoctorDetailObj.AreaOfExpertise.map((AreaOfExpertise,index)=>{
                                return(
                                    <li id={index}>{AreaOfExpertise}</li>
                                )
                            })
                        }
                    </ul>
                </Row>
                <Row>
                    <h2>Training and Education</h2>
                    <div>
                    <h4>Education</h4>
                    <ul>
                    {
                            DoctorDetailObj.Education.map((Education,index)=>{
                                return(
                                    <li id={index}>{Education}</li>
                                )
                            })
                        }
                       
                    
                    </ul>
                    </div>
                    <div>
                    <h4>Board Certification</h4>
                    <ul>
                    {
                            DoctorDetailObj.Certification.map((Certification,index)=>{
                                return(
                                    <li id={index}>{Certification}</li>
                                )
                            })
                        }
                    </ul>
                    </div>
                    
                </Row>
               </Container>
            </div>
        )
    }
    
}

const BookAppointmentDoctor=({AppointmentBooking,paymentButtonClicked,doctorId,DoctorTime})=>{
    const {  UserData } = React.useContext(DataContext);
    const getDate=()=>{
        return  new Date().toJSON().slice(0, 10);
    
    }
    const [TimeSlot, setTimeSolt] = React.useState('10-10.30 PM');

    const [formData,setFormData]=React.useState({
        petOwnerName:UserData.data.Name,
        currentDate:getDate(),
        petName:'',
        species:'',
        breed:'',
        age:'',
        gender:"M",
        weight:'',
        petInformation:'',
        appointmentData:'2023-10-10',
        appointmentTimeSlot:`${DoctorTime.TimeStart}-${DoctorTime.TimeEnd}`,
        doctorId:doctorId,
        PatientId:UserData.data._id
    });
    const handleChangeTimePicker = event=> {
setTimeSolt(event.target.value)
        setFormData({...formData,["appointmentTimeSlot"]: event.target.value});
      };
    
const convertDateFormat=(dateString)=>{
    var date = new Date(dateString.toString().replace('IST', ''));

let day = date.getDate();
let month = date.getMonth()+1;
let year = date.getFullYear();

return year+"-"+month+"-"+day;
}
const selectedDay = (val) =>{
    setFormData({...formData,["appointmentData"]:convertDateFormat( val)});
};
const paymentButton=()=>{
    
    paymentButtonClicked(formData)
}

function backToDoctorDetails(){
    AppointmentBooking(false);
}
const handleInputChange = e => {
    setFormData({...formData,[e.target.name]: e.target.value});
};
const [TimeSlotArr,setTimeSlotArr]=React.useState([]);
function generateTimeSlots(startTime, endTime) {
    console.log(startTime,endTime)
    const timeSlots = [];
    let currentTime = startTime;
  
    while (currentTime <= endTime) {
      timeSlots.push(currentTime);
      
      const [hours, minutes] = currentTime.split(':').map(Number);
      const nextTime = new Date(0, 0, 0, hours, minutes + 30, 0);
      currentTime = `${String(nextTime.getHours()).padStart(2, '0')}:${String(nextTime.getMinutes()).padStart(2, '0')}:00`;
    }
  
    return timeSlots;
  }
  React.useEffect(()=>{

    setTimeSlotArr(generateTimeSlots(DoctorTime.TimeStart,DoctorTime.TimeEnd));
  },[])
  console.log(TimeSlotArr)
    return(
        <div>
      
            <h4><Button onClick={()=>{backToDoctorDetails()}}><FontAwesomeIcon icon={faArrowCircleLeft} /></Button><div>Appointment Booking</div></h4>
<div>
    <Container>
    <div>
        <Row className="AppointmentBookingRows">
        <Col>
            <TextField fullWidth  id="fullWidth" name='petOwnerName' value={formData.petOwnerName}  onChange={handleInputChange} label="Pet Owner Name" variant="filled" />
            </Col>
            <Col className="dateField">
            <TextField  label="Date"  name="currentDate"  value={getDate()} variant="filled" />
            </Col>
    
        </Row>
        </div>  
 <hr/>
        <Row className="AppointmentBookingRows">
            <Col>
            <TextField id="outlined-basic" name='petName'onChange={handleInputChange} label="Pet Name" variant="outlined" /></Col>
            <Col>
            <TextField id="outlined-basic" name='species' onChange={handleInputChange} label="Species" variant="outlined" /></Col>

            <Col>
            <TextField id="outlined-basic" name='breed' onChange={handleInputChange} label="Breed" variant="outlined" />
            </Col>
        </Row>
        <Row className="AppointmentBookingRows">
        <Col>
            <TextField id="outlined-basic" name='age'onChange={handleInputChange} type="number" label="Age" variant="outlined" /></Col>
            <Col>
            <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label" >Gender</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value="M"
    label="Gender"
    name='gender'
    onChange={handleInputChange}
  >
    <MenuItem value={"M"}>Male</MenuItem>
    <MenuItem value={"F"}>Female</MenuItem>
  
  </Select>
</FormControl>
            
            </Col>

            <Col>
            <TextField id="outlined-basic" onChange={handleInputChange} name='weight' type="number" label="Weight in Kg." variant="outlined" />
            </Col>
        </Row>
        <Row className="AppointmentBookingRows PetInformation">       <TextField id="outlined-basic" onChange={handleInputChange} name='petInformation' label="Pet Information" variant="outlined" /> </Row>
   <hr/>
   <Row  className="calendeUser" >
    <div style={{width:"55%" }}>
    <DatePicker getSelectedDay={selectedDay}
                  endDate={100}
                  selectDate={formData.appointmentData}
                  labelFormat={"MMMM"}
                  color={"#374e8c"}   
                 
/>
    </div>
   </Row>
   <hr/>
   <Row>
    <Row>
        <Col>Select 30 Minutes Slot</Col>
      <Col className="BookAppointmentPaymentButton" onClick={()=>{paymentButton()}}>Pay now 250 /- <Button>Payment Now</Button></Col>
    </Row>
    <Row>
       
        <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Time -slot</FormLabel>
   
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={TimeSlot}
        onChange={handleChangeTimePicker}
      >
        <Row>
            {
                  <div>
                  {TimeSlotArr.map((time, index) => (
                  
 <Button><FormControlLabel value={index < TimeSlotArr.length -1 ? `${time}-${TimeSlotArr[index + 1]}` : time} control={<Radio />} label={index < TimeSlotArr.length -1 ? `${time}-${TimeSlotArr[index + 1]}` : time}     key={time}
                    
 style={{ margin: '5px' }} >

             
                    
                     
    </FormControlLabel>
</Button>
                  ))}
                 
                </div>
            
            }
           
        </Row>
      </RadioGroup>
    </FormControl>
    </Row>
   </Row>
    </Container>
</div>
        </div>
    )
}
export default BookAppointment;