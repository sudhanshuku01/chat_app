import React, { useEffect } from 'react'
import chatbg from '../images/5685034.jpg'
const Chatbox = ({data,setData,username,socket}) => {

    useEffect(()=>{
       socket.on("receive_message",(data)=>{
        setData(current=> [...current,data]);
       }
       )
     return () => socket.off("receive_message")
    },[socket,data])

    useEffect(()=>{
       socket.on("receive_message_own",(data)=>{
        setData(current=> [...current,data]);
       }
       )
     return () => socket.off("receive_message_own")
    },[socket,data])

    const fT=(timestamp)=> {
      const date = new Date(timestamp);
      return date.getHours();
    }

  return (
    <div className='chat-box'
    // style={{ backgroundImage: `url(${chatbg})` }}
    >         
     {data?.map((d,index)=>(
       <div key={index} className={`${d.position} chat-message`} >
       <p><span>{d?.username}</span><span></span></p>
       <p>{d?.message}</p>
      </div>
     ))}
    </div>
  )
}

export default Chatbox
