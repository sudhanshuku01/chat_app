import React, { useState,useEffect } from 'react'
import whatsappimg from '../images/whatsapp.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './context/auth'
const Signup = () => {
    const navigate=useNavigate();
    const [auth,setAuth]=useAuth();
    const [data,setData]=useState({
        username:'',
        phoneNumber:'',
        password:''
    })

    useEffect(()=>{
      if(auth.username!==null){
         navigate('/')
      }
     },[auth])

   const signup=async (e)=>{
    e.preventDefault();
     try {
      const res=await axios.post('http://localhost:4000/auth/signup',data)
      if(res && res.data.success){
        console.log("successfully loggedIn")
        navigate('/login',{replace:true})
      }
     } catch (error) {
      console.log(error)
     }
   }
  return (
     <>
    <div className='header'>
    <img src={whatsappimg} alt="" />
    </div>
    <div className='signup'>
       <form>
        <div>
        <label htmlFor="username">userName</label>
        <input  type="text" value={data.username} onChange={(e)=>setData({...data,username:e.target.value})} />
        </div>

        <div>
        <label htmlFor="phoneNumber">phoneNumber</label>
        <input type="text" value={data.phoneNumber} onChange={(e)=>setData({...data,phoneNumber:e.target.value})}  />
        </div>

        <div>     
        <label htmlFor="password">Password</label>
        <input  type="password" value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} />   
        </div>    
         <button onClick={signup}>SIGNUP</button> 
       </form>
    </div>
     </>
  )
}

export default Signup
