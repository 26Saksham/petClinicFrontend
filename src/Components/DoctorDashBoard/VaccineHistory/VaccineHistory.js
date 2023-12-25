import React from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataContext } from "../../Context/DataContext";
import { toast,ToastContainer } from "react-toastify";
import { BASEURL } from "../../../BaseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#DFF6FF",
      color: "#06283D",
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
  
const VaccineHistory=()=>{
const {UserData}=React.useContext(DataContext)
const [getVaccineData,setgetVaccineData]=React.useState([])
const [openDetailDialog,setopenDetailDialog]=React.useState(false);
const [DialogBoxData,setDialogBoxData]=React.useState({});
const handleClickOpenDetails = (data) => {
  setDialogBoxData(data);
  setopenDetailDialog(true);
};

const handleCloseDetails = () => {
  setopenDetailDialog(false);
};
React.useEffect(()=>{
  fetch(`${BASEURL}/getVaccineHistoryByDoctor`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({DoctorId:UserData.data._id}),
})
    .then((response) => response.json())
    .then((data) => {
        if (data.success === true) {
          setgetVaccineData(data.data);
        }
    })
    .catch((error) => {

        toast.error("Server Error,Please wait")
    });
},[])


    return(
        <div>
         <div className="TodayAppHeading AnimationTableTop">Vaccine History</div>

          <ToastContainer/>
 <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Previous Date</StyledTableCell>
            <StyledTableCell>Pet Name</StyledTableCell>
            <StyledTableCell>Vaccine Used (Canine)</StyledTableCell>
            <StyledTableCell>Vaccine Used (Feline)</StyledTableCell>
            <StyledTableCell>Next Date</StyledTableCell>
            <StyledTableCell>Detail</StyledTableCell>

            
          </TableRow>
        </TableHead>
        <TableBody>
        {
          getVaccineData.map((row)=>{
            return(
<StyledTableRow >
              <StyledTableCell >
              {row.currentVaccineDate}
              </StyledTableCell>
              <StyledTableCell>{row.PetName}</StyledTableCell>
              <StyledTableCell>{row.Vaccine[0].Canine}</StyledTableCell>
              <StyledTableCell>{row.Vaccine[0].Feline}</StyledTableCell>

              <StyledTableCell >{row.NextVaccineDate}</StyledTableCell>
              <StyledTableCell><FontAwesomeIcon onClick={()=>{handleClickOpenDetails(row)}} icon={faEdit}/></StyledTableCell>
            

            
            </StyledTableRow>
            )

          })
        }
            
     
        </TableBody>
      </Table>
    </TableContainer>







 
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
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>Details</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <StyledTableRow>
                <StyledTableCell>Address </StyledTableCell>
                <StyledTableCell> {DialogBoxData.Address}</StyledTableCell>
            </StyledTableRow>
          

            <StyledTableRow>
                <StyledTableCell>MobileNumber </StyledTableCell>
                <StyledTableCell> {DialogBoxData.MobileNumber}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell>PetName </StyledTableCell>
                <StyledTableCell> {DialogBoxData.PetName}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell>Breed </StyledTableCell>
                <StyledTableCell> {DialogBoxData.Breed}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell>Sex </StyledTableCell>
                <StyledTableCell> {DialogBoxData.Sex}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell>Date Of Birth </StyledTableCell>
                <StyledTableCell> {DialogBoxData.DOB}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell>Vaccine (Canine)</StyledTableCell>
                <StyledTableCell> {DialogBoxData.Vaccine[0].Canine}</StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
                <StyledTableCell>Vaccine (Feline)</StyledTableCell>
                <StyledTableCell> {DialogBoxData.Vaccine[0].Feline}</StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
                <StyledTableCell>last Vaccine Date</StyledTableCell>
                <StyledTableCell> {DialogBoxData.currentVaccineDate}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell>All Vaccine Complete</StyledTableCell>
                <StyledTableCell> {DialogBoxData.AllVaccineComplete===true?"Complete":"Not Done yet"}</StyledTableCell>
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
    )
}
export default VaccineHistory;