import { useState, useMemo, useEffect } from "react";
import { Label, Textarea,Button } from 'flowbite-react';
import ChatHistory from './History';


const Chat = ({chatMessages,message,setMessage,handleSend,handleTyping,isTyping})=>{
  const [chatMessage, setChat] = useState([]);

  return (<>
   <div className="max-w-md mx-auto p-8" style={{maxWidth : '42rem'}}>
    <ChatHistory isTyping={isTyping} chatMessages={chatMessages}/>
      <div className="mb-2 block">
        <Label htmlFor="message" value="Your message" />
      </div>
      <Textarea id="message" placeholder="Leave a message..." value={message} required rows={4} onChange={(event) =>{ setMessage(event.target.value);event.target.value ? handleTyping(localStorage.getItem('username')) : handleTyping('');}} />
      <Button style={{marginTop: '1vw'}} onClick={handleSend}>Send</Button>
     
    </div>
  </>)


}

export default Chat;