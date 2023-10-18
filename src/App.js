import React, { useEffect, useState } from 'react'
import './App.css'
import Home from './Components/Home';
import io from 'socket.io-client'
// import { Manager } from 'socket.io-client';
import { useAuth } from './Components/context/auth';
import {
  Routes,
  Route,
 } from 'react-router-dom' 
import Signup from './Components/Signup';
import Login from './Components/Login';

const socket = io.connect('http://localhost:4000',{
  auth: {
    data:localStorage.getItem('auth')
  }
})
const App = () => { 
  const [auth,setAuth]=useAuth();
  const [username,setUsername]=useState('');  
  useEffect(()=>{
    setUsername(auth?.username)
  },[auth]) 
  return(
    <Routes>
      <Route path='/' element={ <Home socket={socket} username={username}/>} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default App
