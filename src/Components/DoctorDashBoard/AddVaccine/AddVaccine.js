import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DataContext } from '../../Context/DataContext';
import { Button, Col, Container, Row } from "react-bootstrap";
import { BASEURL } from '../../../BaseUrl';
import { ToastContainer, toast } from "react-toastify";

import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};








const AddVaccine = () => {
    const [vaccine, setVaccine] = React.useState([]);
    const { UserData } = React.useContext(DataContext);
    const [formData, setFormData] = React.useState({
        PetOwnerName: '',
        Address: '',
        MobileNumber: '',
        PetName: '',
        Breed: '',
        Sex: 'M',
        DOB: '',
        Vaccine: [],
        AllVaccineComplete:false,
        DoctorId: UserData.data._id,
    });

  

    // const vhandleChange = (event) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setVaccineName(
    //         // On autofill we get a stringified value.
    //         typeof value === 'string' ? value.split(',') : value,
    //     );
    // };

    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleChange = (event) => {
    //     setVaccine(event.target.value);
    //     setFormData({ ...formData, [event.target.name]: event.target.value });
    // };

    function weeksUntilDate(targetDate) {
        // Extract day, month, and year from the target date string
        const [day, month, year] = targetDate.split('-').map(Number);
      
        // Parse the target date string to a Date object
        const targetDateObj = new Date(year, month - 1, day); // Month is zero-based
      
        // Get the current date
        const currentDate = new Date();
      
        // Calculate the difference in milliseconds
        const timeDifference = currentDate-targetDateObj ;
      
        // Calculate the number of weeks
        const weeksDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 7));
      
        return weeksDifference;
      }
      
   
 
    const gender = [
        {
            value: 'M',
            label: 'M',
        },
        {
            value: 'F',
            label: 'F',
        }
    ];

    const names = [
        'Distemper(D)',
        'Leptospirosis(L)',
        'Parvovirosis(P)',
        'Coronavirosis(C)',
        'FVRCP',
        'Hepatitis',
        'Parianfluenza(Pi)',
        'Adinovirosis(A)',
        'Rabies(R)',
        'FELV',
    ];


    const handleVaccine=(takeInputDate)=>{
    
      
let howManyweeks=weeksUntilDate(takeInputDate);
console.log(howManyweeks)
var result={};
if(howManyweeks>=6 && howManyweeks<9){

    result={Canine:['Distemper(D)','Hepatitis','Parvovirosis(P)','arianfluenza(Pi)','Leptospirosis(L)','Coronavirosis(C)'],Feline:['FVRCP']};
}
else if(howManyweeks>=9 && howManyweeks<16){
    result=  {Canine:['Distemper(D)','Hepatitis','Parvovirosis(P)','arianfluenza(Pi)','Leptospirosis(L)','Coronavirosis(C)','Rabies(R)'],Feline:['FVRCP','FELV','Rabies(R)']};
}

else if(howManyweeks>=16){
    result={Canine:['Rabies(R)'],Feline:['Rabies(R)']};
}
if(howManyweeks>=16){
    setFormData({ ...formData,'Vaccine': result,"DOB": takeInputDate,AllVaccineComplete:true});
}
else{
    setFormData({ ...formData,'Vaccine': result,"DOB": takeInputDate});
}

setVaccine(result);
    }
    console.log(formData);
    const handleSaveButton = () => {
       
        fetch(`${BASEURL}/AddVaccine`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success === true) {
                    toast("Successfully!")
                }
            })
            .catch((error) => {

                alert("Server Error,Please wait")
            });
    }

    return (
        <div>
            <ToastContainer />
            <Row>
                <Col className="TakeInput"><TextField id="standard-basic" onChange={handleInputChange} name='PetOwnerName' label="Owner's Name" variant="standard" /></Col>
                <Col className="TakeInput"><TextField id="standard-basic" onChange={handleInputChange} name='Address' label="Address" variant="standard" /></Col>
                <Col className="TakeInput"><TextField id="standard-basic" onChange={handleInputChange} name='MobileNumber' label="Phone Number" variant="standard" /></Col>
            </Row>
            <Row>

                <Col className="TakeInput"><TextField id="standard-basic" onChange={handleInputChange} name='PetName' label="Pet's Name" variant="standard" /></Col>
                <Col className="TakeInput"><TextField id="standard-basic" onChange={handleInputChange} name='Breed' label="Breed" variant="standard" /></Col>
                <Col className='TakeUnput'>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Sex"
                                name='Sex'
                                defaultValue="M"
                                onChange={handleInputChange}
                            >
                                {gender.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>


                    </Box>

                </Col>
            </Row>

            <Row>
                <Col className='TakeInput'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker name='DOB' onChange={(e) => {
                        handleVaccine(`${e.$D}-${e.$M}-${e.$y}`)    
                        }
                        
                        } label="Date of Birth" />
                        </DemoContainer>
                    </LocalizationProvider>
                </Col>
{/* 
                <Col className='TakeInput'>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                            <Select
                                labelId="Vaccine has been carried out against"
                                id="demo-multiple-checkbox"
                                multiple
                                value={vaccineName}
                                onChange={vhandleChange}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={vaccineName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Col> */}

            </Row>
            <Row>
                <Button onClick={handleSaveButton}>SAVE</Button>
            </Row>
            <div className='notes'>
                <h4>Note:</h4>
                <ul>
                    <li>To provide the initial protection for a full year at least 2 vaccination will be required</li>
                    <li>All dogs should be kept in for a period following initial vaccinations</li>
                    <li>Regular Booster Vaccinations are essential</li>
                    <li>A small number of animals may fail respond to vaccination</li>
                    <li>Occational hypersensitive reactions may occur</li>
                    <h5>Ask your veterinary surgeon for advice on all these points</h5>
                </ul>
            </div>
        </div>
    )
}
export default AddVaccine;