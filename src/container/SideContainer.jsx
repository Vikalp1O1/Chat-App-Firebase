import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore"; 
import { db ,auth } from '../firebase/firebase';
import useAuth from '../store/authContext';
import useChat from '../store/ChatContext';

function SideContainer() {

    const [allUser,setAllUser] = useState([]);
    const {selectedUser,setSelectedUser} = useChat();
    const loggedInUser = auth.currentUser;

    useEffect(()=>{
        
        const getAllUserFromFirebase=async()=>{
            const querySnapshot = await getDocs(collection(db, "users"));

            const fetchedUsers = [];
        querySnapshot.forEach((doc) => {
         console.log(`${doc.id} => ${doc.data()}`);
         const name = doc.data().name;
         const id = doc.data().userId;

         if(loggedInUser.uid !== id){
            fetchedUsers.push({
            name:name,
            userId:id
         });

         }
        
        
        //  console.log(doc.data().name,doc.data().userId , "buyvyubhfnejdinyfeh bwej ");
        }
        
    );
  
        setAllUser(fetchedUsers);
         

        }
        if(loggedInUser){
            getAllUserFromFirebase();
        }
        
    },[loggedInUser])
    
    console.log("All User from state",allUser);
    console.log('selected user',selectedUser);
    
  return (
   <div className="w-1/4 bg-white border-r h-full overflow-y-auto">
            <div className="text-center font-bold text-lg py-4 border-b">Users</div>
            {allUser.map((user) => (
                <button
                    key={user.userId}
                    onClick={() => setSelectedUser(user)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-blue-100 transition ${
                      selectedUser?.userId === user.userId ? "bg-blue-200" : ""
                    }`}
                >
                    {user.name}
                </button>
            ))}
        </div>
  ) 
  
}



export default SideContainer