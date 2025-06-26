import React from 'react'
import useChat from '../store/ChatContext';

function HeadBar() {

  const {selectedUser} = useChat();

  

  return (
    <div className="bg-white border-b px-4 py-3 shadow text-lg font-medium text-gray-800">
      {selectedUser?.name || "Chat"}
    </div>
  )
}

export default HeadBar