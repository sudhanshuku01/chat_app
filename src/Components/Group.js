import React, { useEffect } from 'react'
import profileimg from '../images/profile.png'
const Group = ({data,setData,socket,username,activegroup,setActivegroup,group}) => {
  const handleclick=()=>{
    socket.emit("leave_room",{ 
      username:username, 
      group:activegroup, 
     })
    setData([]);
    setActivegroup(group);
  }
  return (
    <div style={{backgroundColor:activegroup===group?"#efe7f1":"white"}} onClick={handleclick} className='user'
    >
      <img src={profileimg} alt="" />
       <div className='user-info'>
        <h3>{group}</h3>
        <p>hey, how are you ?</p>
       </div>
    </div>
  )
}

export default Group
