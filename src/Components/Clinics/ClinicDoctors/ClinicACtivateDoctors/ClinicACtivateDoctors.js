import React from "react";
import { BASEURL } from "../../../../BaseUrl";
import { DataContext } from "../../../Context/DataContext";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "react-bootstrap";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Switch } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faLocationArrow } from "@fortawesome/free-solid-svg-icons";

const ClinicACtivateDoctors=()=>{
    const {UserData}=React.useContext(DataContext);
   const [ActivateDoctor,setActivateDoctor]=React.useState([]);
   const [DeActivateDoctor,setDeActivateDoctor]=React.useState([]);
const [ShowDoctorProfile,setShowDoctorProfile]=React.useState(false);
const [DoctorProfile,setDoctorProfile]=React.useState({});

   const handleDoctorProfile=(data)=>{
  
    setShowDoctorProfile(true)
    setDoctorProfile(data);
   }

   const handleActivateDoctors=(row)=>{

    const RemoveActivate=ActivateDoctor.filter((doctor)=>{
        return doctor._id!==row._id;
    })
    setActivateDoctor(RemoveActivate);
    setDeActivateDoctor([...DeActivateDoctor,row]);
   }
   const handleDEActivateDoctors=(row)=>{

    const RemoveDEActivate=DeActivateDoctor.filter((doctor)=>{
        return doctor._id!==row._id;
    })
    setDeActivateDoctor(RemoveDEActivate)
    setActivateDoctor([...ActivateDoctor,row]);
   }
  const backButtonhandle=()=>{
    setShowDoctorProfile(false)
  }
    React.useEffect(()=>{

        fetch(`${BASEURL}/getAllActivateDoctors`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({clinicId:UserData.data._id}),
          })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
              if(data.success){

                setActivateDoctor(data.data);
              }
            })
            .catch((error) => {
              console.error(error);
           
            });


            
            fetch(`${BASEURL}/getAllDeActivateDoctors`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({clinicId:UserData.data._id}),
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                  if(data.success){
 console.log(data)
                    setDeActivateDoctor(data.data);
                  }
                })
                .catch((error) => {
                  console.error(error);
               
                });
    },[])
    return(
        <div>
            {
                ShowDoctorProfile===false && 
                    <div>
                    {DeActivateDoctor.length===0 && <div>We Don't Have any Request</div>}
                    {DeActivateDoctor.length!==0 && <DeActivatedDoctor DeActivateDoctor={DeActivateDoctor} handleDEActivateDoctors={handleDEActivateDoctors}  handleDoctorProfile={handleDoctorProfile}/>}
                    <ToastContainer/>
                    {ActivateDoctor.length===0 && <div>No Doctors</div>}
                    {ActivateDoctor.length!==0 && <Doctors ActivateDoctor={ActivateDoctor} handleActivateDoctorsID={handleActivateDoctors} handleDoctorProfile={handleDoctorProfile}/>}
                    
              </div>
                
            }
          {ShowDoctorProfile && <DoctorProfileComponent DoctorDetailObj={DoctorProfile} backButtonhandle={backButtonhandle}/>}
        </div>
    )
}

const Doctors=({ActivateDoctor,handleActivateDoctorsID,handleDoctorProfile})=>{
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(5);
      
        const handleChangePage = (event, newPage) => {
          setPage(newPage);
        };
      
        const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(+event.target.value);
          setPage(0);
        };
        const handleActivateDoctors=(doctorId,clinicId)=>{
        
            fetch(`${BASEURL}/deActivatingDoctor`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({doctorId:doctorId,clinicId:clinicId}),
              })
                .then((response) => response.json())
                .then((data) => {
                  if(data.success){
    toast.success("DeActivating Doctor...")
                  }
                  else{
                    toast(data.response)
                  }
                })
                .catch((error) => {
                  toast.error("INTERNAL SERVER ERROR");
               
                });
        }
return(
   <div>
    <div>Activate Doctor</div>
        <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
       <TableRow>
              <TableCell align="center">
                Name
              </TableCell>
              <TableCell align="center" >
                City
              </TableCell>
              <TableCell align="center" >
              Experience
              </TableCell>
              <TableCell align="center" >
              Available Time
              </TableCell>
              <TableCell align="center" >
                Activate
              </TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {ActivateDoctor
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow key={row._id} >
                <TableCell align="center" onClick={()=>{handleDoctorProfile(row)}}>
                    {row.Name}
                </TableCell  >
                <TableCell align="center" onClick={()=>{handleDoctorProfile(row)}}>
                    {row.City}
                </TableCell>
                <TableCell align="center" onClick={()=>{handleDoctorProfile(row)}}>
                    {row.Experience}
                </TableCell>
                <TableCell align="center" onClick={()=>{handleDoctorProfile(row)}}>
                    {row.AvailableTimeSlotStart} - {row.AvailableTimeSlotEnd}
                </TableCell>
                <TableCell align="center">
                 <Switch defaultChecked  onChange={()=>{    handleActivateDoctorsID(row);handleActivateDoctors(row._id,row.clinicId);}}/>
                </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={ActivateDoctor.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
   </div>
)
}




const DeActivatedDoctor=({DeActivateDoctor,handleDEActivateDoctors,handleDoctorProfile})=>{
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);                        
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const handleDeActivateDoctors=(doctorId,clinicId)=>{
        console.log(doctorId,clinicId)
        fetch(`${BASEURL}/ActivatingDoctor`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({doctorId:doctorId,clinicId:clinicId}),
          })
            .then((response) => response.json())
            .then((data) => {
              if(data.success){
toast.success("Activating Doctor...")
              }
              else{
                toast(data.response)
              }
            })
            .catch((error) => {
              toast.error("INTERNAL SERVER ERROR");
           
            });
    }
    return(
        <div>
    <div>Request for Activate Doctor</div>
    <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
         <TableRow>
                <TableCell align="center">
                  Name
                </TableCell>
                <TableCell align="center" >
                  City
                </TableCell>
                <TableCell align="center" >
                Experience
                </TableCell>
                <TableCell align="center" >
                Available Time
                </TableCell>
                <TableCell align="center" >
                  Activate
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {DeActivateDoctor
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row._id}  >
                  <TableCell align="center" onClick={()=>{handleDoctorProfile(row)}}>
                      {row.Name}
                  </TableCell  >
                  <TableCell align="center" onClick={()=>{handleDoctorProfile(row)}}>
                      {row.City}
                  </TableCell>
                  <TableCell align="center" onClick={()=>{handleDoctorProfile(row)}}>
                      {row.Experience}
                  </TableCell>
                  <TableCell align="center" onClick={()=>{handleDoctorProfile(row)}}>
                      {row.AvailableTimeSlotStart} - {row.AvailableTimeSlotEnd}
                  </TableCell>
                  <TableCell align="center">
                   <Switch   onChange={()=>{handleDEActivateDoctors(row);handleDeActivateDoctors(row._id,row.clinicId)}}/>
                  </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={DeActivateDoctor.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
        </div>
       
    )
}


const DoctorProfileComponent=({DoctorDetailObj,backButtonhandle})=>{
    const backToDoctorDetails=()=>{
        backButtonhandle()
    }

    if(DoctorDetailObj){
        return(
       
            <div>
           
                <h4><Button onClick={()=>{backToDoctorDetails()}}><FontAwesomeIcon icon={faArrowCircleLeft} /></Button><div>Doctor Detail</div></h4>
               
               
               <Container>
    
                <Row>
            <Col xs={6}>
                <Row>
                <div>{ DoctorDetailObj.Name}</div>
                <div>{DoctorDetailObj.City} <FontAwesomeIcon icon={faLocationArrow}/></div>
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


export default ClinicACtivateDoctors;