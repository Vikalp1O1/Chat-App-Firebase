import React from 'react'
import useAuth from '../store/authContext';
import { Navigate } from 'react-router-dom';

function PublicRoutes({children}) {
    const {isLoggedIn,isLoading} = useAuth();

    if(isLoading){
      return <div>Loading...</div>;
    }


  return isLoggedIn ? <Navigate to="/" replace /> : children;
}

export default PublicRoutes