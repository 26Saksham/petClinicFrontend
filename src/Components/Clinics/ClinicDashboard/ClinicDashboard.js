
import React from "react";
import { DataContext } from "../../Context/DataContext";
import { BASEURL } from "../../../BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './ClinicDashboard.css';
function geCountoftClinicDoctorwithPatientsServer(UserData){

    var promise=new Promise((resolve,rejects)=>{
     
        fetch(`${BASEURL}/geCountoftClinicDoctorwithPatients`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({clinicId:UserData.data._id}),
          })
            .then((response) => response.json()).then((data)=>{
            resolve(data);
        }).catch((error)=>{
rejects(error)
        })
    })
    return promise;
}


const ClinicDashBoard=()=>{
    const {UserData}=React.useContext(DataContext);
    const [countNoOfpatientWithEachDoctor,setCountNoOfpatientWithEachDoctor]=React.useState([]);
  const[CountDoctorAppo,setCountDocAppo]=React.useState({Doctor:0,Appointment:0});
React.useState(()=>{
    geCountoftClinicDoctorwithPatientsServer(UserData).then((data)=>{
        console.log(data)
if(data.success){
    setCountNoOfpatientWithEachDoctor(data.data);
    let Sum=0,count=data.data.length;
    data.data.forEach((d)=>{Sum+=d.Count});
    setCountDocAppo({Doctor:count,Appointment:Sum});
}
    }).catch((error)=>{
      console.log(error)
      toast.error(error);
    })
},[])


    return(
        <div>
            <h1>DashBoard</h1>
            <CountDoCApp CountDoctorAppo={CountDoctorAppo}/>
        <CountPatientWithDoctor countNoOfpatientWithEachDoctor={countNoOfpatientWithEachDoctor}/>
            <ToastContainer/>
        </div>
    )
}
  
const CountDoCApp=({CountDoctorAppo})=>{
 
  return(
    <div>
<Container>
      <Row className="CountDocAppointROw">
        <Col className="CountDocAppointCol">
          <h6>No Of Doctors</h6>
        <span  className="count-animation"> {CountDoctorAppo.Doctor}+</span> 
        </Col>
        <Col className="CountDocAppointCol">
          <h6>No Of Appointments</h6>
          <span className="count-animation">{CountDoctorAppo.Appointment}+</span>
        </Col>
      </Row>
    </Container>
    </div>
  )
}
const CountPatientWithDoctor=({countNoOfpatientWithEachDoctor})=>{
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);                        
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    return(
        <div>
            <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
         <TableRow>
                <TableCell align="center">
                  Doctor Id
                </TableCell>
                <TableCell align="center" >
                  Doctor Name
                </TableCell>
                <TableCell align="center" >
              Total  No Of Appointment <FontAwesomeIcon style={{color:"green"}} icon={faCheckCircle}/>
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {countNoOfpatientWithEachDoctor
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row._id}  >
                  <TableCell align="center">
                      {row.Id[0]}
                  </TableCell  >
                  <TableCell align="center" >
                      {row.Name}
                  </TableCell>
                  <TableCell align="center" >
                      {row.Count}
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
          count={countNoOfpatientWithEachDoctor.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
        </div>
    )
}
export default ClinicDashBoard;