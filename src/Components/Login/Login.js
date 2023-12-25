import React from "react";
import { Alert, Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faFingerprint, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { BASEURL } from "../../BaseUrl";
import { DataContext } from "../Context/DataContext";
import { useNavigate } from "react-router-dom"; //// used for navigation from one page to another
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [Asa, setAs] = React.useState('Doctor');
  const [windowDimensions, setWindowDimensions] = React.useState({});
  const handleAsa = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAs(newAlignment);
    }
  };

  const hasWindow = typeof window !== 'undefined';
  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width: width,
      height: height,
    };
  }



  React.useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }


      if (window.addEventListener('resize', handleResize)) {
        window.addEventListener('resize', handleResize);
      }
      else {
        handleResize();
      }
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return (
    <div>
      <Navigation Asa={Asa} handleAsa={handleAsa} />
      {Asa === "Doctor" && <AsADoctor windowDimensions={windowDimensions} />}
      {Asa === "Patient" && <AsAPatient windowDimensions={windowDimensions} />}
      {Asa === "Clinic" && <AsAClinic windowDimensions={windowDimensions} />}
      <ToastContainer />
    </div>
  )
}
const Navigation = ({ Asa, handleAsa }) => {


  return (
    <div>
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Row>
          <Stack direction="row" spacing={4}>
            <ToggleButtonGroup
              value={Asa}
              exclusive
              onChange={handleAsa}
              aria-label="text alignment"
            >
              <ToggleButton value="Clinic" aria-label="left aligned">
                AS A Clinic
              </ToggleButton>
              <ToggleButton value="Doctor" aria-label="left aligned">
                AS A Doctor
              </ToggleButton>

              <ToggleButton value="Patient" aria-label="right aligned">
                AS A  patient
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Row>
      </Container>
    </div>
  )
}
const AsAPatient = ({ windowDimensions }) => {
  const { setIsAuthenticated, setUserData } = React.useContext(DataContext);
  const [signUpDetail, setSignUpDetails] = React.useState({ Name: '', Email: "", password: '', MobileNumber: "", As_A: 'P' });
  const [loginDetails, setLoginDetails] = React.useState({ Email: '', password: '', AS_A: 'P' });
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();
  const handleSignUP = (e) => {
    setSignUpDetails({ ...signUpDetail, [e.target.name]: e.target.value });
  }
  const handleLogin = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  }

  const handleLoginClicl = () => {

    if (loginDetails.Email != '' && loginDetails.password != '') {
      fetch(`${BASEURL}/userLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      })
        .then((response) => response.json())
        .then((data) => {

          if (data.success === false) {
            setMessage(data.response);
          }
          else {
            setIsAuthenticated(true);
            setUserData({ data: data.response, As_A: 'P' })
            navigate("/");

          }
        })
        .catch((error) => {
          setMessage("Server Error,Please wait")
        });
    }

  }
  const handleSignUpClick = () => {
    if (signUpDetail.Name != '' && signUpDetail.Email != '' && signUpDetail.password != '' && signUpDetail.MobileNumber != '') {

      fetch(`${BASEURL}/UserCreating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpDetail),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success === false) {
            setMessage(data.response);
          }
          else {
            toast("Account Created!")
          }
        })
        .catch((error) => {
          setMessage("Server Error,Please wait")
        });
    }
  }
  return (
    <div >
      <h1>{message !== '' && message}</h1>
      <Container>
        <Row style={{ minHeight: `${windowDimensions.height}px`, marginTop: '2rem' }}>
          <Col style={{ marginRight: '2rem' }}>
            <Row style={{ justifyContent: 'center', textAlign: 'center' }}>
              <h2>Login</h2>
            </Row>


            <Row style={{ marginTop: '0.5rem' }}>
              <TextField
                required
                id="outlined-required"
                label="Email"
                name="Email"
                type="email"
                onChange={handleLogin}
                placeholder="Enter Email"
              />
            </Row>
            <Row style={{ marginTop: '0.5rem' }}>
              {/* <Col xs={9}> */}
              <TextField
                required
                id="outlined-password-input"
                label="Password"
                name="password"
                onChange={handleLogin}
                type="password"
                autoComplete="current-password"
              />
              {/* </Col> */}
              <Row style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
                <Button style={{ width: 'fit-content' }} variant="outlined" onClick={() => {
                  handleLoginClicl()
                }}>
                  Login <FontAwesomeIcon style={{ marginLeft: '0.3rem' }} icon={faSignIn} />
                </Button>
              </Row>


            </Row>

          </Col>
          <Col style={{ marginLeft: '2rem' }}>
            <Row style={{ justifyContent: 'center', textAlign: 'center' }}>
              <h2>Create User</h2>
            </Row>
            <Container>
              <Row style={{ marginTop: '0.5rem' }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Name"
                  name="Name"
                  type="text"
                  placeholder="Name"
                  onChange={handleSignUP}
                />
              </Row>
              <Row style={{ marginTop: '0.5rem' }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  name="Email"
                  type="email"
                  placeholder="Email"
                  onChange={handleSignUP}
                />
              </Row>
              <Row style={{ marginTop: '0.5rem' }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="password"
                  onChange={handleSignUP}
                />
              </Row>
              <Row style={{ marginTop: '0.5rem' }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Mobile Number"
                  name="MobileNumber"
                  onChange={handleSignUP}
                  type="number"
                  placeholder="Mobile Number"
                />
              </Row>
              <Row style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
                <Button style={{ width: 'fit-content' }} variant="outlined" onClick={() => { handleSignUpClick() }} >
                  Sign UP   <FontAwesomeIcon icon={faFingerprint} style={{ marginLeft: '0.3rem' }} />
                </Button>
              </Row>
            </Container>
          </Col>

        </Row>
      </Container>
    </div>
  )
}
const AsADoctor = ({ windowDimensions }) => {
  const { setIsAuthenticated, setUserData } = React.useContext(DataContext);
  const [loginDetails, setLoginDetails] = React.useState({ Email: '', password: '', AS_A: 'D' });

  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();
  const handleLogin = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  }

  const handleLoginClicl = () => {
    if (loginDetails.Email != '' && loginDetails.password != '') {
      fetch(`${BASEURL}/userLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log(data)
          if (data.success === false) {
            setMessage(data.response);
          }
          else if (data.Activate == false) {
            navigate('/RequestActivateDoctor')
            setIsAuthenticated(true);
            setUserData({ data: data.response, As_A: 'D', Activate: false })
          }
          else {
            setIsAuthenticated(true);
            setUserData({ data: data.response, As_A: 'D', Activate: true })
            navigate("/");
          }
        })
        .catch((error) => {
          setMessage("Server Error,Please wait")
        });
    }
  }


  return (
    <div>
      <h1>{message !== '' && message}</h1>
      <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '50%' }}>
        <Row style={{ marginTop: '1rem' }}>
          <h2>Login</h2>
        </Row>
        <Row style={{ marginTop: '1rem', width: '70%' }}>
          <TextField
            required
            id="outlined-required"
            label="Email"
            name="Email"
            type="email"
            fullWidth
            onChange={handleLogin}
            placeholder="Enter Email"
          />
        </Row>
        <Row style={{ marginTop: '1rem', width: '70%' }}>
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            name="password"
            onChange={handleLogin}
            type="password"
            autoComplete="current-password"
          />
        </Row>
        <Row style={{ marginTop: '1rem' }}>
          <Button variant="outlined" onClick={handleLoginClicl}>
            Login <FontAwesomeIcon style={{ marginLeft: '0.3rem' }} icon={faSignIn} />
          </Button>
        </Row>
      </Container>

    </div>
  )
}
const AsAClinic = () => {
  const { setIsAuthenticated, setUserData } = React.useContext(DataContext);
  const [loginDetails, setLoginDetails] = React.useState({ Email: '', password: '', As_A: 'C' });
  const [signUpDetails, setSignUpDetails] = React.useState({ Name: '', Password: '', Email: '', Contact: '', State: '', City: '', Address: '', As_A: 'C' });
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();
  const inputchangeLogin = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  }
  const inputchangeSignup = (e) => {
    setSignUpDetails({ ...signUpDetails, [e.target.name]: e.target.value });
  }
  const Signuphandle = () => {


    const User = {
      Email: signUpDetails['Email'],
      password: signUpDetails['Password'],
      MobileNumber: signUpDetails['Contact'],
      Name: signUpDetails['Name'],
      As_A: "C"
    }

    fetch(`${BASEURL}/UserCreating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(User),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success === false) {
          setMessage(`${data.response} Try New Email Id for Clinic`);
        }
        else {
          fetch(`${BASEURL}/CreateClinic`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(signUpDetails),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success === false) {
                setMessage(data.response);
              }
              else {
                toast("Clinic Created!")
              }
            })
            .catch((error) => {
              setMessage("Server Error,Please wait")
            });

        }
      })
      .catch((error) => {
        setMessage("Server Error,Please wait")
      });


  }

  const Loginhandle = (data) => {



    if (loginDetails.Email != '' && loginDetails.password != '') {
      fetch(`${BASEURL}/userLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          if (data.success === false) {
            setMessage(data.response);
          }
          else {

            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
            setUserData({ data: data.response, As_A: 'C' })
            navigate("/");

          }
        })
        .catch((error) => {
          setMessage("Server Error,Please wait")
        });
    }

  }

  return (
    <div>
      {message}
      <Container>
        <Row style={{marginTop:'2rem'}}>

          <Col style={{marginRight:'2rem'}}>     {/* ---------LOGIN column */}
            <Row style={{marginTop:'1rem', justifyContent: 'center', textAlign: 'center' }}>
              <h2>Register</h2>
            </Row>
            <Row>
              <Col>
                <Row style={{marginTop:'1rem'}}>
                  <TextField type='text' id='name' name='Name' placeholder="Enter Clinic's Name" onChange={(e) => inputchangeSignup(e)} />
                </Row>
                <Row style={{marginTop:'1rem'}}>
                  <TextField type='password' name='Password' placeholder='Enter  password' onChange={(e) => inputchangeSignup(e)} />
                </Row>
                <Row style={{marginTop:'1rem'}}>
                  <TextField type='email' name='Email' placeholder="Enter  clinic's email " onChange={(e) => inputchangeSignup(e)} />
                </Row>
                
              </Col>
              <Col>
                <Row style={{marginTop:'1rem', marginLeft:'.15rem'}}>

                  <TextField type='text' name='City' placeholder='Enter City' onChange={(e) => inputchangeSignup(e)} />
                </Row>
                <Row style={{marginTop:'1rem', marginLeft:'.15rem'}}>
                  <TextField type='text' name='Address' placeholder='Enter current Address' onChange={(e) => inputchangeSignup(e)} />
                </Row>
                <Row style={{marginTop:'1rem', marginLeft:'.15rem'}}>
                  <TextField type='text' name='Contact' placeholder='Enter Contact Number' onChange={(e) => inputchangeSignup(e)} />
                </Row>
              </Col>
            </Row>
            <Row style={{marginTop:'1rem', justifyContent: 'center'}}>
                  <TextField style={{width:'50%'}} type='text' name='State' placeholder='Enter  state' onChange={(e) => inputchangeSignup(e)} />
                </Row>
            <Row style={{ marginTop: '1rem', justifyContent: 'center' }}>
              <Button style={{ width: 'fit-content' }} variant="outlined" onClick={() => { Signuphandle() }} >
                Register   <FontAwesomeIcon icon={faFingerprint} style={{ marginLeft: '0.3rem' }} />
              </Button>
            </Row>

          </Col>

          <Col style={{marginLeft:'2rem'}}>     {/* ---------Register column */}
          <Row style={{marginTop:'1rem', justifyContent: 'center', textAlign: 'center' }}>
              <h2>Login</h2>
            </Row>
            <Row style={{marginTop:'1rem'}}>
              <TextField type='text' name='Email' placeholder="Enter Clinic's Email" onChange={(e) => inputchangeLogin(e)} />
            </Row>
            <Row style={{marginTop:'1rem'}}>
              <TextField type='password' name='password' placeholder='Enter  password' onChange={(e) => inputchangeLogin(e)} />
            </Row>

            <Row style={{ marginTop: '1rem', justifyContent: 'center' }}>
          <Button style={{ width: 'fit-content' }} variant="outlined" onClick={() => Loginhandle()}>
            Login <FontAwesomeIcon style={{ marginLeft: '0.3rem' }} icon={faSignIn} />
          </Button>
        </Row>

            {/* <div>
              <Button onClick={() => Loginhandle()}>Login </Button>
            </div> */}



          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default Login;
