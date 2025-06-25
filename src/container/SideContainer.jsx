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
    <div className='w-120'>
    <div>SideContainer</div>
    {allUser.map((user)=>(
        <button key={user.userId} onClick={()=>setSelectedUser(user)} className='bg-blue-400 w-full text-start h-8 text-xl' >{user.name}</button>
        // console.log(user,"user inside map");

        
    ) )}
    </ div>
  ) 
  
}



export default SideContainer