import React from 'react'
import User from './User'
import Group from './Group'
const List = ({data,setData,socket,username, activegroup,setActivegroup,groups,setGroups}) => {
  return ( 
    <div className='list'>
      <div className='list-head'>
      <p>GroupChat</p>
      <p>UserChat</p>
      </div>
      <div className='list-content'>
        {groups?.map((group,index)=>(
          <Group data={data} setData={setData} socket={socket} username={username} activegroup={activegroup} setActivegroup={setActivegroup} key={index} group={group} />
        ))}
      </div>
    </div>
  )
}

export default List
