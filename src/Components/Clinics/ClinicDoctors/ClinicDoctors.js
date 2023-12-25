import { TextField } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import { BASEURL } from "../../../BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import { DataContext } from "../../Context/DataContext";
import ClinicACtivateDoctors from "./ClinicACtivateDoctors/ClinicACtivateDoctors";
const ClinicDoctors=()=>{
    const {UserData}=React.useContext(DataContext)
const [loginDetails,setLoginDetails]=React.useState({Name:'',password:'',Email:'',MobileNumber:'',As_A:"D",clinicId:UserData.data._id});
const [addDoctorFeilds,setAddDoctorFeilds]=React.useState(false);

console.log(UserData);
    const Addhandle=()=>{
        setAddDoctorFeilds(true);
  }
    const saveHandle=()=>{
     
        fetch(`${BASEURL}/CreateDeActivateDoctors`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(loginDetails),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success === false) {
              toast.error(data.response)
              
              } else {
             toast("Data Saved")
                       setAddDoctorFeilds(false);
                       setLoginDetails({Name:'',password:'',Email:'',MobileNumber:'',As_A:"D",clinicId:UserData.data._id})

              }
            })
            .catch((error) => {
              console.error(error);
              // setError('something went wrong! please try again later');
            });
    }

    const onvaluechange=(e)=>{
         setLoginDetails({...loginDetails,[e.target.name]:e.target.value});
    }


return(
    <div>
        <div>
        <Button onClick={()=>Addhandle()}> Add Doctor</Button>
            </div>
            {addDoctorFeilds && <div>
                <TextField
                type="text"
                className="inputfeild"
                onChange={(e) => onvaluechange(e)}
                name="Name"
                placeholder="Enter Your Name"
              />
 <TextField
                type="text"
                className="inputfeild"
                onChange={(e) => onvaluechange(e)}
                name="password"
                placeholder="Enter Password"
              />
 <TextField
                type="email"
                className="inputfeild"
                onChange={(e) => onvaluechange(e)}
                name="Email"
                placeholder="Enter Email of Doctor"
              />
 <TextField
                type="text"
                className="inputfeild"
                onChange={(e) => onvaluechange(e)}
                name="MobileNumber"
                placeholder="Enter Contact No. of Doctor"
              />
<Button onClick={saveHandle}>Save</Button>
            </div>}
            <ClinicACtivateDoctors/>
            <ToastContainer />
    </div>
)
}
export default ClinicDoctors;