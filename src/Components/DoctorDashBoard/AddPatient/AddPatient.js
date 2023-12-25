import React from "react";
import TextField from '@mui/material/TextField';
import { DataContext } from "../../Context/DataContext";
import { Col, Container, Row } from "react-bootstrap";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { BASEURL } from "../../../BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import Loader  from "../../Loader/Loader";
const AddPatient=()=>{
    return(
        <div>
            <InputsDetails/>
        </div>
    )
}
const InputsDetails=()=>{
    const [VaccineComplete, setVaccineComplete] = React.useState('N');
    const {  UserData } = React.useContext(DataContext);
    const [ShowDetils,setShowDetials]=React.useState(true);
const [sex,setSex]=React.useState("M")
    console.log(UserData)
    const getDate=()=>{
        return  new Date().toJSON().slice(0, 10);
    
    }
    const handleInputChange = e => {
        setFormData({...formData,[e.target.name]: e.target.value});
        if(e.target.name==="gender"){
          setSex(e.target.value);
        }
    };
    const handleChange = (event) => {
          
        setVaccineComplete(event.target.value);
      };
    const [formData,setFormData]=React.useState({
        petOwnerName:'',
        currentDate:getDate(),
        petName:'',
        species:'',
        breed:'',
        age:'',
        gender:"M",
        weight:'',
        petInformation:'',
        Temperature:'',
        PulseRate:'',
        HR:'',
        RR:'',
        CRT:'',
        MM:'',
        AllVaccineComplete:'N',
        NextVaccineCycle:0,
        MobileNumber:'',
      
        // appointmentTimeSlot:`${DoctorTime.TimeStart}-${DoctorTime.TimeEnd}`,
        DoctorId:UserData.data._id,
    });
 

    const handleSaveButton=()=>{
      setShowDetials(false)
      fetch(`${BASEURL}/AddOfflinePatient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
     if(data.success===true){
      toast("Successfully!")
     }
    })
        .catch((error) => {

            alert("Server Error,Please wait")
        });
        setShowDetials(true)
    }


    return(
    <div>
          {ShowDetils && <Container>
           <Row className="AppointmentBookingRows">
        <Col>
            <TextField fullWidth  id="fullWidth" name='petOwnerName' value={formData.petOwnerName}  onChange={handleInputChange} label="Pet Owner Name" variant="filled" />
            </Col>
            <Col className="dateField">
            <TextField  label="Date"  name="currentDate"  value={getDate()} variant="filled" />
            </Col>
            <Col>
            <TextField  label="MobileNumber"  name="MobileNumber"  onChange={handleInputChange} variant="filled" />
            
            </Col>
    
        </Row>
        <hr/>
 <Row className="AppointmentBookingRows"><TextField  onChange={handleInputChange}   id="filled-read-only-input"  value={formData.petInformation} name='petInformation' label="Pet Information" variant="filled" /> </Row>
<hr/>
        <hr/>
        <Row className="AppointmentBookingRows">
            <Col>
            <TextField id="outlined-basic" name='petName' onChange={handleInputChange} label="Pet Name" variant="outlined" /></Col>
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
    value={sex}
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
      <Col className="TakeInput"><button  className="DoctorSaveButton" onClick={()=>{handleSaveButton()}} >Save</button></Col>  
       </Row>

           </Container>}
           {
            ShowDetils===false &&<div>
              <Loader/>
            </div>
           }
<ToastContainer/>
    </div>
    )
}
export default AddPatient;