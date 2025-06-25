import { createContext , useContext } from "react";

export const ChatContext = createContext({

    selectedUser:null,
    message:'',
    sendMessage:()=>{},
    getConversation:()=>{},

});


export default function useChat(){
     return useContext(ChatContext);
}