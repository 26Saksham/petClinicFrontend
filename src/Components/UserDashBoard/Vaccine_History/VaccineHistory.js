import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
import Typography from '@mui/material/Typography';
import { BASEURL } from '../../../BaseUrl';

import { DataContext } from '../../Context/DataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleStop, faEdit, faHeartCircleCheck, faHouseCircleXmark, faXmark, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

const getAppointmentHistoryByClient=(id)=>{
  var promise=new Promise((resolve,rejects)=>{
    fetch(`${BASEURL}/getAppointmentHistoryByClient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({PatientId:id}),
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


const getNextAppointment=(id)=>{
  var promise=new Promise((resolve,rejects)=>{
    fetch(`${BASEURL}/getNextAppointmentByClient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({PatientId:id}),
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
    backgroundColor: theme.palette.common.black,
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


export default function CustomizedTables() {
  const {UserData}=React.useContext(DataContext)
const [HistoryData,setHistoryData]=React.useState([]);
React.useEffect(()=>{
  getAppointmentHistoryByClient(UserData.data._id).then((res)=>{
    if(res.success){
      setHistoryData(res.response);
      
    }
  }).then((error)=>{
console.log(error)
  })

  getNextAppointment(UserData.data._id).then((res)=>{
    if(res.success){
      NextAppointmentList=[]
res.response.forEach((data)=>{
 
  NextAppointmentList.push({PetName:data.PetName,AppointmentBookingDate:data.AppointmentBookingDate,AppointmentBookingTime:data.AppointmentBookingTime});
})
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
      <div>
        <h1>Appointment History</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Pet Name</StyledTableCell>
                <StyledTableCell>Next Appointment Date</StyledTableCell>
                <StyledTableCell>Next Appointment Time</StyledTableCell>
                <StyledTableCell>Vaccine Completed</StyledTableCell>
                <StyledTableCell>Details</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {HistoryData.map((row) => (
                <StyledTableRow key={row.AppointmentID}>
                  <StyledTableCell align="left" component="th" scope="row">
                    {row.PetName}
                  </StyledTableCell>
                  <StyledTableCell>{row.NextAppointmentDate}</StyledTableCell>
                  <StyledTableCell>{row.NextAppointmentTime}</StyledTableCell>
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
        <h6>Next Appointment Date : {DialogBoxData.NextAppointmentDate}</h6>
        <h6>Next Appointment Time : {DialogBoxData.NextAppointmentTime}</h6>
<h6>Previously Appointment Date:{DialogBoxData.AppointmentBookingDate}</h6>
<h6>Appointment Booking Time:{DialogBoxData.AppointmentBookingTime}</h6>

             Pet Name : {DialogBoxData.PetName}<br></br>
             Species :{DialogBoxData.Species}<br/>
             Breed : {DialogBoxData.Breed}<br/>
             PetAge : {DialogBoxData.PetAge}<br/>
             PetGender : {DialogBoxData.PetGender}<br/>
             petWeight : {DialogBoxData.petWeight}<br/>
             petInformation : {DialogBoxData.petInformation}<br/>
             Temperature : {DialogBoxData.Temperature}<br/>
             PulseRate :{DialogBoxData.PulseRate}<br/>
             HR :{DialogBoxData.HR }<br/>
             RR :{DialogBoxData.RR}<br/>
             CRT :{DialogBoxData.CRT}<br/>
             MM : {DialogBoxData.MM}<br/>

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
      
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          View Shceduled Appointment
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Scheduled Vaccinations:"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
{
  NextAppointmentList.map((data,index)=>{
    return(
      <div>
      <AccordionSummary aria-controls="panel1d-content" id={"panel"+`${index+1}`+"d-header"}>
                    <Typography>{data.PetName}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    Date : {data.AppointmentBookingDate} <br/>
                    Time :   {data.AppointmentBookingTime}<br/>
                    </Typography>
                  </AccordionDetails>
                  </div>

    )
  })
}
                  
                </Accordion>
             
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    </div>
  );
}
