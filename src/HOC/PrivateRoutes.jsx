import React from 'react'
import useAuth from '../store/authContext';
import { Navigate } from 'react-router-dom';

function PrivateRoutes({children}) {

    const {isLoggedIn,isLoading} = useAuth();
    
    if(isLoading){
      return <div>Loading...</div>;
    }
    
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}


export default PrivateRoutes
