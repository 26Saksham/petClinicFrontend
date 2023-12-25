import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TextField } from "@mui/material";
import { DataContext } from "../../Context/DataContext";
import { ToastContainer, toast } from 'react-toastify';
import { BASEURL } from "../../../BaseUrl";
import Button from '@mui/material/Button';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSign } from "@fortawesome/free-solid-svg-icons";
const ClinicProfile = () => {
  const { UserData } = React.useContext(DataContext);
  const [profileDetails, setProfileDetilas] = React.useState({ _id: '', Name: '', Email: '', MobileNumber: '', State: '', City: '', Address: '' });
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {


    fetch(`${BASEURL}/getClinicByEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email: UserData.data.Email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          toast(data.response);
        }
        else {

          setProfileDetilas(
            {
              _id: data.data[0]._id, Name: data.data[0].Name, Email: data.data[0].Email, MobileNumber: data.data[0].MobileNumber, State: data.data[0].State, City: data.data[0].City, Address: data.data[0].City
            })
        }
      })
      .catch((error) => {
        toast("Server Error,Please wait")
      });
  }, [])

  const Signuphandle = () => {

    setLoading(true);

    fetch(`${BASEURL}/ClinicUpdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          toast(data.response);
        }
        else {
          toast("Update Successfully!")
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast("Server Error,Please wait")
      });


  }

  const inputchangeSignup = (e) => {
    setProfileDetilas({ ...profileDetails, [e.target.name]: e.target.value });
  }
  console.log(UserData)
  if (UserData) {
    return (
      <div>
        <Container>
          <Row style={{marginTop:"1rem", width:"80%", justifyContent:"center"}}> 
          <Col>
            <TextField fullWidth type='text' id='name' name='Name' value={profileDetails.Name} placeholder="Enter Clinic's Name" onChange={(e) => inputchangeSignup(e)} />
          </Col>
          <Col>
            <TextField type='email' fullWidth name='Email' value={profileDetails.Email} placeholder="Enter  clinic's email " onChange={(e) => inputchangeSignup(e)} />
          </Col>
        </Row>
          <Row style={{marginTop:"1rem", width:"80%", justifyContent:"center"}}>
          <Col >
            <TextField fullWidth type='text' name='State' value={profileDetails.State} placeholder='Enter  state' onChange={(e) => inputchangeSignup(e)} />
          </Col>
          <Col >
            <TextField fullWidth type='text' name='City' value={profileDetails.City} placeholder='Enter City' onChange={(e) => inputchangeSignup(e)} />
          </Col>
        </Row>
          <Row style={{marginTop:"1rem", width:"80%"}}>
          <Col>
            <TextField fullWidth type='text'   name='Address' value={profileDetails.Address} placeholder='Enter current Address' onChange={(e) => inputchangeSignup(e)} />
          </Col>
          <Col>
            <TextField fullWidth type='text' name='MobileNumber' value={profileDetails.MobileNumber} placeholder='Enter Contact Number' onChange={(e) => inputchangeSignup(e)} />
          </Col>
        </Row>
  
        {loading === false && <Row style={{marginTop:"1rem", width:"80%", justifyContent:"center"}}>
                <Button  style={{ width: 'fit-content' }} variant="outlined" onClick={() => Signuphandle()}>
                  Save <FontAwesomeIcon style={{ marginLeft: '0.3rem' }} icon={faSign} />
                </Button>
              </Row>

              }
        </Container>
     
        
        <ToastContainer />
      </div>
    )
  }

}
export default ClinicProfile;