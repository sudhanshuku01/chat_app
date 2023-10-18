import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import profileimg from '../images/profile.png'
import Message from './Message';
import Chatbox from './Chatbox';
import leaveimg from '../images/logout.png'


const Chat = ({data,setData,setActivegroup, activegroup,socket,username,}) => {
     const navigate=useNavigate();
    const leavegroup=()=>{
      socket.emit("leave_room",{ 
       username:username, 
       group:activegroup, 
      })
      setActivegroup("")
      setData([])
     }
    
  return (
    <div className='chat'>
      <div className='chat-profileinfo'>
        <div>
        <img src={profileimg} alt="" />
        <p>{activegroup}</p>
        </div>
        <img onClick={leavegroup}  src={leaveimg} alt="" />
      </div>
      <Chatbox data={data} setData={setData} username={username} socket={socket}/>
      {activegroup!=="" && <Message activegroup={activegroup} username={username} socket={socket} />}
    </div>
  )
}

export default Chat
