import React, { useState } from 'react'
import { ChatContext } from './ChatContext';

function ChatProvider({children}) {

    const [selectedUser,setSelectedUser] = useState(null);
    const [message,setMessage] = useState('');

    const sendMessage =()=>{

    };

    const getConversation = ()=>{

    };


  return (
    <ChatContext.Provider value={{selectedUser,setSelectedUser,message,setMessage,sendMessage,getConversation}}>
        {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider