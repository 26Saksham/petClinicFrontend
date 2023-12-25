import * as React from 'react';
import Button from '@mui/material/Button';

import { TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faSave } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Col, Container, Row } from "react-bootstrap";
import { DataContext } from '../../Context/DataContext';
import { BASEURL } from '../../../BaseUrl';
import './DoctorProfile.css'
import { ToastContainer, toast } from 'react-toastify';







const DoctorProfile = () => {
    const {UserData}=React.useContext(DataContext);
const [DoctorProfileData,setDoctorProfileData]=React.useState([]);
const [Contact, setContact] = React.useState(['']);
const [Expert, setExpert] = React.useState(['']);
const [Edu, setEdu] = React.useState(['']);
const [Cert, setCert] = React.useState(['']);
React.useEffect(()=>{
    fetch(`${BASEURL}/getDoctorProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({DoctorId:UserData.data._id}),
      })
        .then((response) => response.json())
        .then((data) => {
        
  if(data.success){
    console.log(data)
    setDoctorProfileData(data.data);

if(data.data.AreaOfExpertise){
setExpert(data.data.AreaOfExpertise);  
}

if(data.data.Contact){
    setContact(data.data.Contact);  
    }



    if(data.data.Education){
        setEdu(data.data.Education);  
        }

        
        
if(data.data.Certification){
    setCert(data.data.Certification);  
    }

  }
        })
        .catch((error) => {
        
            toast("Server Error,Please wait")
        });

},[])

   
    const CheckAllFieldFill = (ArrayFeild) => {
        var check = true;
        ArrayFeild.forEach(element => {
            if (element === '' || element.length === 0) {
                check = false;
            }
        });
        return check;
    }
    const addContactField = () => {

        setContact([...Contact, '']);
    };

    const addExpertField = () => {

        setExpert([...Expert, '']);
    };

    const addEduField = () => {

        setEdu([...Edu, '']);
    };

    const addCertField = () => {

        setCert([...Cert, '']);
    };

    const handleContactFieldChange = (index, event) => {
        const updatedTextFields = [...Contact];
        updatedTextFields[index] = event.target.value;
        setContact(updatedTextFields);
    };

    const handleExpertFieldChange = (index, event) => {
        const updatedTextFields = [...Expert];
        updatedTextFields[index] = event.target.value;
        setExpert(updatedTextFields);
    };

    const handleEduFieldChange = (index, event) => {
        const updatedTextFields = [...Edu];
        updatedTextFields[index] = event.target.value;
        setEdu(updatedTextFields);
    };

    const handleCertFieldChange = (index, event) => {
        const updatedTextFields = [...Cert];
        updatedTextFields[index] = event.target.value;
        setCert(updatedTextFields);
    };
    console.log(DoctorProfileData);
    const handleSaveButton=()=>{
        
    }
    return (

        // <div className='containerProfile'>

        <Container>
            <Row>
                <Col>
                    <div style={{ marginTop: '1rem' }}>
                    <TextField fullWidth value={DoctorProfileData.Name} id="filled-read-only-input" className='InputTextDoctorReg' focused  name='Name' type="Text" label="Name" variant='filled' />
                    </div>
                </Col>
                <Col>
                    <div style={{ marginTop: '1rem' }}>
                    <TextField value={DoctorProfileData.City} fullWidth className='InputTextDoctorReg' id="filled-read-only-input" focused name='City' type="Text" label="City" variant='filled' />
                    </div></Col>
                <Col>
                    <div style={{ marginTop: '1rem' }}>
                    <TextField fullWidth value={DoctorProfileData.Experience} className='InputTextDoctorReg' id="filled-read-only-input" focused name='Experience' type="Text" label="Experience" variant='filled' />
                    </div></Col>
            </Row>



            <Row>
                <Col>
                    <div >
                  
                        <div style={{ marginTop: '1rem' }}>
                            {Contact.map((text, index) => (
                               
                    <TextField  key={index} fullWidth className='InputTextDoctorReg'  id="filled-read-only-input"  value={text}
                                        onChange={(event) => { handleContactFieldChange(index, event); }} name='Contact' type="Number" label='Contact' variant='filled' />
                                    
                            ))}
                            {CheckAllFieldFill(Contact) && <button onClick={addContactField}><FontAwesomeIcon icon={faPlusCircle} /></button>}

                        </div>
                    </div></Col>
                <Col>
                    <div >
           
                        <div style={{ marginTop: '1rem' }}>

                            {Expert.map((text, index) => (
                     
                              
                                        <TextField fullWidth className='InputTextDoctorReg' key={index}  id="filled-read-only-input"  value={text}
                                         onChange={(event) => { handleExpertFieldChange(index, event); }} name='AreaofExpertise' type="Text" label='Area of Expertise' variant='filled' />
                         
                            ))}
                            {CheckAllFieldFill(Expert) && <button onClick={addExpertField}><FontAwesomeIcon icon={faPlusCircle} /></button>}

                        </div>
                    </div></Col>

                    <Col>
                    <div style={{ marginTop: '1rem' }}>
               
                            {Edu.map((text, index) => (
                             
                
<TextField  key={index} fullWidth className='InputTextDoctorReg' id="filled-read-only-input"   value={text}
                                        onChange={(event) => { handleEduFieldChange(index, event); }} name='Education' type="Text" label='Education' variant='filled' />                                 
                            
                            ))}
                            {CheckAllFieldFill(Edu) && <button onClick={addEduField}><FontAwesomeIcon icon={faPlusCircle} /></button>}

                 
                    </div></Col>

            </Row>



            <Row>
              
                <Col>
                  
                            {Cert.map((text, index) => (
                          
                              
     <TextField  key={index} fullWidth className='InputTextDoctorReg' id="filled-read-only-input"    value={text}
                                        onChange={(event) => { handleCertFieldChange(index, event); }} name='Certifications' type="Text" label='Certifications' variant='filled' />
                       
                            ))}
                            {CheckAllFieldFill(Cert) && <button onClick={addCertField}><FontAwesomeIcon icon={faPlusCircle} /></button>}
</Col>
            </Row>
            <hr/>    
            <Row>
                <Col>
        
       
                                                     
     <TextField fullWidth className='InputTextDoctorReg' id="filled-read-only-input" focused value={DoctorProfileData.Profile}   name='Profile' type="Text" label='Profile' variant='filled' />
                       
            </Col>
                <Col>
       
                   
     <TextField fullWidth className='InputTextDoctorReg'  id="filled-read-only-input"    name='Fees' type="Text" label='Fees (INR)' variant='filled' />

           
                </Col>
                <Col>
                 
     <TextField fullWidth className='InputTextDoctorReg' id="filled-read-only-input"    name='Offers' type="Text" label='Offers' variant='filled' />

                </Col>
            </Row>
<hr/>
            <Row style={{padding:"5px"}}>
                <Col>
                    <div >
               
                        <TimePicker label="Start Available Time" value={dayjs(`2022-04-17T${`${DoctorProfileData.AvailableTimeSlotStart}`}`)}/>
                    </div></Col>
                <Col>
                    <div >
                      
                        <TimePicker label="End Available Time"  value={dayjs(`2022-04-17T${`${DoctorProfileData.AvailableTimeSlotEnd}`}`)}/>
                    </div></Col>
                <Col>
           
                  
     <TextField  id="filled-read-only-input" value={DoctorProfileData.Email} focused fullWidth className='InputTextDoctorReg'   name='Email' type="Text" label='Email' variant='filled' />

                 </Col>
            </Row>



            <Row style={{padding:"5px"}}>
                <Col>
               
                            <button className="saveBtn" onClick={handleSaveButton}>Save    <FontAwesomeIcon icon={faSave}/></button>
                       </Col>
            </Row>






        </Container>





    )
}
export default DoctorProfile;