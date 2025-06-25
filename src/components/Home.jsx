import React from 'react'
import useAuth from '../store/authContext';
import { useNavigate } from 'react-router-dom';
import {auth} from '../firebase/firebase';
import SideContainer from '../container/SideContainer';

function Home() {
    const {user , logout} = useAuth();
    const navigate = useNavigate();
    // here auth.currentUser is used to get the current user that is logged in 
    console.log('current user ',auth.currentUser); 
    

    
  return (
   <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-center w-full">Home Page</h1>

        
        <button
          className="absolute right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>

      </div>
      <div className=" flex flex-col items-center justify-center mt-40">
          <h1 className="text-gray-700 text-2xl">Welcome, {user?.email}!</h1>
          <p className="text-gray-700 text-lg ">You are logged in.</p>
        </div>
        <SideContainer />
    </div>
  )
}

export default Home