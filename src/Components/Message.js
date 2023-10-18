import React, { useState } from 'react'
import sendimg from '../images/send.png'
const Message = ({activegroup,username,socket}) => {
  const [input,setInput]=useState('')

  const sendMessage=()=>{
   socket.emit("send_message",{
    message:input, 
    username:username, 
    group:activegroup, 
    __createdtime__:Date.now()
   })
   setInput("")
  }
  const handlekeydown= e =>{
    if (e.keyCode === 13) {
      sendMessage();
    }
  }
  return (
    <div className='message'>
      <input onKeyDown={handlekeydown} value={input}
       onChange={(e)=>setInput(e.target.value)} type="text" placeholder='Type a message' />
      <img onClick={sendMessage} src={sendimg} alt="" />
    </div>
  )
}

export default Message
