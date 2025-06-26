import React from 'react'
import useChat from '../store/ChatContext';
import { db ,auth } from '../firebase/firebase';
import HeadBar from './HeadBar';
import InputBar from './InputBar';
import Chats from './Chats';

function ChatContainer() {

const {selectedUser} = useChat();
const loggedInUser = auth.currentUser;
  

  if (!selectedUser) {
    return <div className="flex-1 flex items-center justify-center bg-gray-100 text-gray-600 text-xl">
                <h1>Welcome to Chat App ! </h1>
              
            </div>
  }

  return (
  <div className="flex-1 flex flex-col bg-gray-100 h-full">
            <HeadBar />
            <div className="flex-1 overflow-y-auto px-4">
                <Chats />
            </div>
            <div className="border-t px-4 py-2 bg-white">
                <InputBar />
            </div>
        </div>
   

  )

}

export default ChatContainer