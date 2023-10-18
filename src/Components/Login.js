import React,{useEffect, useState} from 'react'
import whatsappimg from '../images/whatsapp.png'
import axios from 'axios'
import { useAuth } from './context/auth'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate();
    const [auth, setAuth]= useAuth()
    const [data,setData]=useState({
        phoneNumber:'',
        password:''
    })
    useEffect(()=>{
     if(auth.username!==null){
        navigate('/')
     }
    },[auth])
    const login=async (e)=>{
        e.preventDefault();
        try {
            const res=await axios.post('http://localhost:4000/auth/login',data)
            if (res && res.data.success) {
                setAuth({
                  username: res.data.username,
                  token: res.data.token,
                });
               await localStorage.setItem("auth", JSON.stringify(res.data));
               navigate("/",{replace:true})
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
       <div className='signup login'>
          <form>

           <div>
           <label htmlFor="phoneNumber">phoneNumber</label>
           <input type="text" value={data.phoneNumber} onChange={(e)=>setData({...data,phoneNumber:e.target.value})}  />
           </div>
   
           <div>     
           <label htmlFor="password">Password</label>
           <input  type="password" value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} />   
           </div>    
            <button
            onClick={login}
            >LOGIN</button> 
          </form>
       </div>
        </>
     )
}

export default Login
