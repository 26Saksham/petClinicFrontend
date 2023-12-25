import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { BASEURL } from '../../../BaseUrl';

import { DataContext } from '../../Context/DataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit, faHeartCircleCheck, faHouseCircleXmark, faXmark, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import './AppointmentHistory.css';
const getAppointmentHistoryByClient=(id)=>{
  var promise=new Promise((resolve,rejects)=>{
    fetch(`${BASEURL}/getAppointmentHistoryByDoctor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({DoctorId:id}),
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




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:"#08122D",
    color: theme.palette.common.white,
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

var NextAppointmentList=[]

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


export default function AppointmentHistory() {
  const {UserData}=React.useContext(DataContext)
const [HistoryData,setHistoryData]=React.useState([]);
React.useEffect(()=>{
  getAppointmentHistoryByClient(UserData.data._id).then((res)=>{
    console.log(res);
    if(res.success){
      setHistoryData(res.response);
    }
  }).then((error)=>{
console.log(error)
  })

},[])

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [open, setOpen] = React.useState(false);
const [openDetailDialog,setopenDetailDialog]=React.useState(false);
const [DialogBoxData,setDialogBoxData]=React.useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenDetails = (data) => {
    setDialogBoxData(data);
    setopenDetailDialog(true);
  };

  const handleCloseDetails = () => {
    setopenDetailDialog(false);
  };
  return (
    <div>
      <div className="TodayAppointmentDiv">
        <h1 className='AppointmentHeading'>Appointment History</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Pet Owner Name</StyledTableCell>
                <StyledTableCell align="left">Pet Name</StyledTableCell>

                <StyledTableCell>Previously Appointment Date</StyledTableCell>
                <StyledTableCell>Previously Appointment Time</StyledTableCell>
                <StyledTableCell>Vaccine Completed</StyledTableCell>
                <StyledTableCell>Details</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {HistoryData.map((row) => (
                <StyledTableRow key={row.AppointmentID}>
                        <StyledTableCell align="left" component="th" scope="row">
                    {row.PetOwnerName}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.PetName}
                  </StyledTableCell>
                  <StyledTableCell>{row.AppointmentBookingDate}</StyledTableCell>
                  <StyledTableCell>{row.AppointmentBookingTime}</StyledTableCell>
                {row.AllVaccineComplete &&  <StyledTableCell>{<FontAwesomeIcon icon={faCheckCircle}/>}</StyledTableCell>}
                {row.AllVaccineComplete===false &&  <StyledTableCell>{<FontAwesomeIcon icon={faXmarkCircle}/>}</StyledTableCell>}
                <StyledTableCell><FontAwesomeIcon onClick={()=>{handleClickOpenDetails(row)}} icon={faEdit}/></StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
     
      {(Object.keys(DialogBoxData).length)!==0 &&
 <div>  <Dialog
          open={openDetailDialog}
          onClose={handleCloseDetails}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Scheduled Vaccinations Details:"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div>
              <TableContainer component={Paper}>
          <Table  aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>History</StyledTableCell>
                <StyledTableCell>Details</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <StyledTableRow>
                <StyledTableCell>Next Appointment Date </StyledTableCell>
                <StyledTableCell> {DialogBoxData.NextAppointmentDate}</StyledTableCell>
            </StyledTableRow>
          
            <StyledTableRow>
                <StyledTableCell>Next Appointment Time  </StyledTableCell>
                <StyledTableCell> {DialogBoxData.NextAppointmentTime}</StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
                <StyledTableCell>Previously Appointment Date: </StyledTableCell>
                <StyledTableCell>{DialogBoxData.AppointmentBookingDate}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell> Previously Appointment Booking Time:</StyledTableCell>
                <StyledTableCell> {DialogBoxData.AppointmentBookingTime}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell>  Pet Name  </StyledTableCell>
                <StyledTableCell> {DialogBoxData.PetName}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell> Species </StyledTableCell>
                <StyledTableCell> {DialogBoxData.Species}<br/></StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell>  Breed  </StyledTableCell>
                <StyledTableCell> {DialogBoxData.Breed}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell>PetAge </StyledTableCell>
                <StyledTableCell>{DialogBoxData.PetAge}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell>PetGender </StyledTableCell>
                <StyledTableCell> {DialogBoxData.PetGender}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell>petWeight </StyledTableCell>
                <StyledTableCell> {DialogBoxData.petWeight}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell>petWeight </StyledTableCell>
                <StyledTableCell> {DialogBoxData.petWeight}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell>petInformation</StyledTableCell>
                <StyledTableCell> {DialogBoxData.petInformation}</StyledTableCell>
            </StyledTableRow>
      

            <StyledTableRow>
                <StyledTableCell>Temperature</StyledTableCell>
                <StyledTableCell> {DialogBoxData.Temperature}</StyledTableCell>
            </StyledTableRow>



            <StyledTableRow>
                <StyledTableCell>Temperature</StyledTableCell>
                <StyledTableCell> {DialogBoxData.Temperature}</StyledTableCell>
            </StyledTableRow>  <StyledTableRow>
                <StyledTableCell>PulseRate</StyledTableCell>
                <StyledTableCell> {DialogBoxData.PulseRate}</StyledTableCell>
            </StyledTableRow>  <StyledTableRow>
                <StyledTableCell>HR</StyledTableCell>
                <StyledTableCell> {DialogBoxData.HR}</StyledTableCell>
            </StyledTableRow>  <StyledTableRow>
                <StyledTableCell>RR</StyledTableCell>
                <StyledTableCell> {DialogBoxData.RR}</StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
                <StyledTableCell>MM</StyledTableCell>
                <StyledTableCell> {DialogBoxData.MM}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell>CRT</StyledTableCell>
                <StyledTableCell> {DialogBoxData.CRT}</StyledTableCell>
            </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
 

              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetails} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      } 


    </div>
  );
}
