import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar.js'
import Home from './Components/Home/Home.js';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import   {getAccessToken}  from './utlis.js';

function App({children}) {
  const hasWindow = typeof window !== 'undefined';
  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width:width,
     height: height,
    };
  }


  const [windowDimensions, setWindowDimensions] = React.useState({});
 React.useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      
      if(window.addEventListener('resize',handleResize)){
          window.addEventListener('resize', handleResize);
      }
      else{
          handleResize();
      }
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);
  
  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
      <div className='Navbar' style={{'minHeight':`${windowDimensions.height}px`}}>
      <Navbar/>
{/* <Home/> */}
    </div>
    </LocalizationProvider>
    
  );
}

export default App;
