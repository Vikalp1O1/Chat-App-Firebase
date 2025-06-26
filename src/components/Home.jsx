import React from 'react'
import useAuth from '../store/authContext';
import { useNavigate } from 'react-router-dom';
import {auth} from '../firebase/firebase';
import SideContainer from '../container/SideContainer';
import ChatContainer from '../container/ChatContainer';

function Home() {
    const {user , logout} = useAuth();
    const navigate = useNavigate();
    // here auth.currentUser is used to get the current user that is logged in 
    console.log('current user ',auth.currentUser); 
    

    
  return (
    <div className="h-screen w-full flex flex-col">
            <div className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
                <h1 className="text-xl font-semibold">Chat App</h1>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    onClick={() => {
                        logout();
                        navigate("/login");
                    }}
                >
                    Logout
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <SideContainer />
                <ChatContainer />
            </div>
        </div>
  )
}

export default Home