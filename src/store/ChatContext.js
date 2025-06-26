import { createContext , useContext } from "react";

export const ChatContext = createContext({

    selectedUser:null,
    message:null,
    messageToEdit:null,
    messageEdit:()=>{},
    messageDelete:()=>{},
    sendMessage:()=>{},
    getConversation:()=>{},

});


export default function useChat(){
     return useContext(ChatContext);
}