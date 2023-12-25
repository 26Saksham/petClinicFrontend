export  const getAccessToken=()=>{
    const data=localStorage.getItem('token');
    if(data){
      
  return data;
    }
   return 0;
 }