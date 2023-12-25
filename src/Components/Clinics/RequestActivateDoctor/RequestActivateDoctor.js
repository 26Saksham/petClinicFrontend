import * as React from 'react';
import { TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faSave } from '@fortawesome/free-solid-svg-icons';
import { DataContext } from '../../Context/DataContext';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Button, Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import { BASEURL } from '../../../BaseUrl';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useNavigate } from "react-router-dom";
 const RequestActivateDoctor=()=>{
    const {setIsAuthenticated,UserData, setUserData}=React.useContext(DataContext);
const [SavedRequestData,setSavedRequestData]=React.useState(false);
    const [Contact, setContact] = React.useState([UserData.data.Contact]);
    const [Expert, setExpert] = React.useState([UserData.data.AreaOfExpertise]);
    const [Edu, setEdu] = React.useState([UserData.data.Experience]);
    const [Cert, setCert] = React.useState([UserData.data.Certification]);
    const [verificationDetials,setVerificationDetials]=React.useState({
    _id:UserData.data._id,
    Name:UserData.data.Name,
    Contact:Contact,
    City:UserData.data.City,
    AreaOfExpertise:Expert,
    Profile:UserData.data.Profile,
    Experience:UserData.data.Experience,
    Education:Edu,
    Certification:Cert,
    AvailableTimeSlotStart:UserData.data.AvailableTimeSlotStart,
    AvailableTimeSlotEnd:UserData.data.AvailableTimeSlotEnd,
    Email:UserData.data.Email,
    clinicId:UserData.data.clinicId
  
})
React.useEffect(()=>{
    if(UserData.data.RequestSend){
        setSavedRequestData(true);
    }
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
        setVerificationDetials({...verificationDetials,['Contact']:updatedTextFields});
    };

    const handleExpertFieldChange = (index, event) => {
        const updatedTextFields = [...Expert];
        updatedTextFields[index] = event.target.value;
        setExpert(updatedTextFields);
        setVerificationDetials({...verificationDetials,['AreaOfExpertise']:updatedTextFields});
    };

    const handleEduFieldChange = (index, event) => {
        const updatedTextFields = [...Edu];
        updatedTextFields[index] = event.target.value;
        setEdu(updatedTextFields);
        setVerificationDetials({...verificationDetials,['Education']:updatedTextFields});

    };

    const handleCertFieldChange = (index, event) => {
        const updatedTextFields = [...Cert];
        updatedTextFields[index] = event.target.value;
        setCert(updatedTextFields);
        setVerificationDetials({...verificationDetials,['Certification']:updatedTextFields});
    };
    const handleSaveButton=()=>{
        fetch(`${BASEURL}/UpdataRequestActivateUser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(verificationDetials),
          })
            .then((response) => response.json())
            .then((data) => {
          
        if(data.success==false){
            toast(data.response);
        }
        else{
            toast("Update Successfully!");
            setSavedRequestData(true);
        }
            })
            .catch((error) => {
            
                toast("Server Error,Please wait")
            });
    }
    const navigate = useNavigate();
const handleSignOutButton=()=>{
    setIsAuthenticated(false);
    setUserData({});
    navigate('/')
}
    const handleInput=(e)=>{
        setVerificationDetials({...verificationDetials,[e.target.name]:e.target.value});
    }
    const handleInputTimeAvailableTimeSlotStart=(e)=>{
   console.log(e)
        setVerificationDetials({...verificationDetials,['AvailableTimeSlotStart']:`${e.$H}:${e.$m}:${e.$s}`});
    }
    const handleInputTimeAvailableTimeSlotEnd=(e)=>{
   
        setVerificationDetials({...verificationDetials,['AvailableTimeSlotEnd']:`${e.$H}:${e.$m}:${e.$s}`});
    }
    const steps = [
        'Clinic Create Doctor',
        'Profile Submit By Doctor',
        'Verification By Clinic',
      ];
      console.log(SavedRequestData)
   if(UserData.data.RequestSend===false && SavedRequestData===false){
    return (

        <Container>
            <Row>
            <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
            </Row>
            <Row>
       
                <Col>
                 
                    <TextField fullWidth className='InputTextDoctorReg' value={verificationDetials.Name} onChange={handleInput} id="filled-read-only-input" name='Name' type="Text" label="Name" variant='filled' />

                </Col>
                <Col>
                    <div >
                    <TextField fullWidth className='InputTextDoctorReg' value={verificationDetials.City} onChange={handleInput} id="filled-read-only-input" name='City' type="Text" label="City" variant='filled' />
                    </div></Col>
                <Col>
                    <div >
                    <TextField fullWidth className='InputTextDoctorReg' value={verificationDetials.Experience} onChange={handleInput} id="filled-read-only-input" name='Experience' type="Text" label="Experience in yrs." variant='filled' />
                    </div></Col>
          

            </Row>



            <Row>
                <Col>
                    <div >
                  
                        <div>
                            {Contact.map((text, index) => (
                               
                    <TextField  key={index} fullWidth className='InputTextDoctorReg'  id="filled-read-only-input"  value={text}
                                        onChange={(event) => { handleContactFieldChange(index, event); }} name='Contact' type="Number" label='Contact' variant='filled' />
                                    
                            ))}
                            {CheckAllFieldFill(Contact) && <button onClick={addContactField}><FontAwesomeIcon icon={faPlusCircle} /></button>}

                        </div>
                    </div></Col>
                <Col>
                    <div >
           
                        <div>

                            {Expert.map((text, index) => (
                     
                              
                                        <TextField fullWidth className='InputTextDoctorReg' key={index}  id="filled-read-only-input"  value={text}
                                         onChange={(event) => { handleExpertFieldChange(index, event); }} name='AreaofExpertise' type="Text" label='Area of Expertise' variant='filled' />
                         
                            ))}
                            {CheckAllFieldFill(Expert) && <button onClick={addExpertField}><FontAwesomeIcon icon={faPlusCircle} /></button>}

                        </div>
                    </div></Col>

                    <Col>
                    <div >
               
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

            <Row>
                <Col>
        
                  
                                                     
     <TextField fullWidth className='InputTextDoctorReg' id="filled-read-only-input"  onChange={handleInput}   name='Profile' type="Text" label='Profile' variant='filled' />
                       
            </Col>
     
            </Row>

            <Row>
                <Col>
                    <div >
               
                        <TimePicker views={['hours', 'minutes', 'seconds']}  onChange={handleInputTimeAvailableTimeSlotStart}  name='AvailableTimeSlotStart' label="Start Available Time" />
                    </div></Col>
                <Col>
                    <div >
              
                        <TimePicker views={['hours', 'minutes', 'seconds']} onChange={handleInputTimeAvailableTimeSlotEnd}  name='AvailableTimeSlotEnd' label="End Available Time"  />
                    </div></Col>
                <Col>
           
                  
     <TextField  id="filled-read-only-input" onChange={handleInput} fullWidth value={verificationDetials.Email} className='InputTextDoctorReg'   name='Email' type="Text" label='Email' variant='filled' />

                 </Col>
            </Row>



            <Row>
                <Col>
               
                            <button className="saveBtn" onClick={handleSaveButton}>Save    <FontAwesomeIcon icon={faSave}/></button>
                       </Col>
            </Row>




<Row><Button onClick={handleSignOutButton}>Sign Out</Button></Row>
<ToastContainer/>

        </Container>





    )
   }
   if(UserData.data.RequestSend ||  SavedRequestData){
    return(
        <div>
        <Stepper activeStep={2} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
       Not Verified By Doctor,Please  Wait......
      </div>
      <Button onClick={handleSignOutButton}>Sign Out</Button>
        </div>
    )
   }
   
}
export default RequestActivateDoctor;