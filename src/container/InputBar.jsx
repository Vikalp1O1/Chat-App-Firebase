import React, { useState } from 'react'
import useChat from '../store/ChatContext';
// import { auth } from '../firebase/firebase';


function InputBar() {

const [input,setInput] = useState('');
const {sendMessage} = useChat();
// const loggedInUser = auth.currentUser;



const clickHandler =()=>{
    console.log(input,'message in input');
    sendMessage(input);
    setInput('');
};

// console.log(message,'that needs to save');


  return (
     <div className="flex items-center gap-2">
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="Your message..."
        className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={clickHandler}
      >
        Send
      </button>
    </div>
  )
}

export default InputBar