import React, { useEffect, useState } from 'react'
import { ChatContext } from './ChatContext';
import { collection, addDoc, getDocs, onSnapshot, serverTimestamp,doc, deleteDoc} from "firebase/firestore";
import { auth, db } from '../firebase/firebase';

function ChatProvider({children}) {

  const loggedInUser = auth.currentUser;
    const [selectedUser,setSelectedUser] = useState(null);
    const [message,setMessage] = useState(null);
    const [messageToEdit,setMessageToEdit] = useState(null);


    useEffect(()=>{
      getConversation();
    },[selectedUser]);

    const sendMessage =async(input)=>{

      // console.log(input, 'message in chat provider');
      // console.log(message,'messafe i chat provider');
      // console.log(selectedUser,'selected user in chat provider');
      
      // console.log(message.msg,message.sender,message.reciever);
      
      
      try {
        const docRef = await addDoc(collection(db,'messages'),{
          message:input,
          sender:loggedInUser.uid,
          reciever:selectedUser.userId,
          timestamp:serverTimestamp()

        });
         console.log("Document written with ID: ", docRef.id);

      } catch (error) {
        console.error("Error adding document: ", error);
      }

    };

    const getConversation = async()=>{

      

      const querySnapshot = onSnapshot(collection(db, "messages"),(snapshot)=>{
        const allMessage = snapshot.docs.map((doc)=>({
                 message:doc.data().message,
                  sender:doc.data().sender,
                  reciever:doc.data().reciever,
                  id:doc.id,
                  timestamp:doc.data().timestamp
        }))
        allMessage.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);
        console.log(allMessage,'id doc nnrnejriregn');
        
        setMessage(allMessage);
      });
          // console.log(allMessage,'all Messages');
        

       };

    const messageDelete = async (messageId)=>{
      console.log(messageId,'id of message to delete in provider');
      await deleteDoc(doc(db,'messages',messageId));

      console.log('message deleted...');
      

    };

    const messageEdit = ()=>{

    };



  return (
    <ChatContext.Provider value={{selectedUser,setSelectedUser,message,setMessage,sendMessage,getConversation,messageToEdit,setMessageToEdit,messageDelete,messageEdit}}>
        {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider