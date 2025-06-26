import React, { useEffect } from 'react'
import useChat from '../store/ChatContext';
import { auth } from '../firebase/firebase';
import EditPopUp from './EditPopUp';


function Chats() {

    const {getConversation,selectedUser,message,messageDelete,setMessageToEdit,messageEdit} = useChat();
    const loggedInUser = auth.currentUser.uid;

    
    // console.log(loggedInUser,typeof(loggedInUser), 'loggedInUser');
    // console.log(selectedUser.userId,typeof(selectedUser.userId),'selectedUser');
    
    

   console.log(message,'messages in chats');

   const AllConvo = message;
//    console.log(AllConvo,'alllll');
   
 const selectedConvo =  AllConvo.filter((msg)=>{
  
   const isSenderReceiver = 
    (msg.sender === loggedInUser && msg.reciever === selectedUser.userId) ||
    (msg.sender === selectedUser.userId && msg.reciever === loggedInUser);
  return isSenderReceiver;
    
 });

 const deleteHandler=({msg})=>{

    const messageId = msg.id;
    messageDelete(messageId)

    console.log(msg.id,'msg at click delete');
    
 }

const editHandler = ({msg})=>{

    setMessageToEdit({msg});
    messageEdit(msg.id);
};
    
 
    
 

 console.log(selectedConvo,'selected messages');
 

  return (
   <div className="flex flex-col space-y-2 py-4">
            {selectedConvo.map((msg, index) => (
                <div
                    key={index}
                    className={`px-4 py-2 rounded-lg max-w-[70%] break-words ${
                      msg.sender === loggedInUser
                        ? "bg-blue-500 text-white self-end"
                        : "bg-gray-300 text-gray-900 self-start"
                    }`}
                >
                   <div className={`${msg.sender === loggedInUser ? `group`:null}`}>
                     <p>{msg.message}</p>
                    
                    <p className="text-xs mt-1 opacity-70 text-right">
                        {msg.timestamp?.seconds
                            ? new Date(msg.timestamp.seconds * 1000).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                              })
                            : ""}
                    </p>
                     <button className='text-white hidden group-hover:block bg-gray-500 rounded border' onClick={()=>editHandler({msg})} >Edit</button>
                     <button className='text-white hidden group-hover:block bg-gray-500 rounded border' onClick={()=>deleteHandler({msg})} >Delete</button>
                   </div>
                </div>
            ))}
        </div>
  )
}

export default Chats