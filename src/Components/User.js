import React from 'react'
import profileimg from '../images/profile.png'
const User = () => { 
  return (
    <div className='user'>
      <img src={profileimg} alt="" />
       <div className='user-info'>
        <h3>Himanshu</h3>
        <p>hey, how are you ?</p>
       </div>
    </div>
  )
}

export default User
