import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import List from './List';
import Chat from './Chat';
import whatsappimg from '../images/whatsapp.png'
const Home = ({socket,username}) => {
  const [data,setData]=useState([])
  const [groups,setGroups]=useState(["React","Node","JS","Angular"])
  const [activegroup,setActivegroup]=useState("")
  const navigate=useNavigate();
  
  useEffect(()=>{
    if(activegroup !=="" && username !=="" ){
      socket.emit('join_room',{
        username:username,
        group:activegroup
      })
    }
  },[activegroup])

  return (
    <>
    <div className='header'>
    <img src={whatsappimg} alt="" />
    </div>
    <div className='home'>
    <div className='home-sidebar'>  
    </div>
    <List data={data} setData={setData} socket={socket} username={username}  activegroup={activegroup} setActivegroup={setActivegroup} groups={groups} setGroups={setGroups}
    />
    <Chat data={data} setData={setData} setActivegroup={setActivegroup} socket={socket} username={username} activegroup={activegroup} />
    </div>
    </>
  )
}

export default Home
