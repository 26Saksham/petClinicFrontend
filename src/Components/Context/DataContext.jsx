
import {createContext,useState} from 'react'
export const DataContext=createContext(null);

const DataProvider=({children})=>{

  const [isAuthenticated, setIsAuthenticated]=useState(false);
  const [UserData, setUserData] = useState({});


return(
    <div>
    <DataContext.Provider value={{
isAuthenticated, setIsAuthenticated,UserData, setUserData
    }}>
  
         {children}
    </DataContext.Provider>
    </div>
)

}

export default DataProvider;
