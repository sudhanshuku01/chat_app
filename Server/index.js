import express from 'express'
const app = express();
import http from 'http'
import cors from 'cors'
import connect from './db/db.js';
import  {router} from './routes/authroutes.js'
import {Server} from 'socket.io'
app.use(cors()); // Add cors middleware
app.use(express.json())
connect(); 

const server = http.createServer(app); // Add this
const CHAT_BOT="SChatBot";

let chatRoom=""
let chatRoomUsers = ''; // E.g. javascript, node,...
let allUsers = []; // All users in current chat group

app.use('/auth',router);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(socket.id)
  const {data}=socket.handshake.auth
  console.log(data)
  socket.on('join_room', (data) => {
    const { username, group } = data;
    console.log(data)
    socket.join(group);
    
    let __createdtime__ = Date.now();

    socket.to(group).emit('receive_message', {
      message: `${username} has joined the chat group`,
      username: CHAT_BOT,
      position:"middle",
      __createdtime__,
    });

    socket.emit('receive_message_own',{
      username: CHAT_BOT,
      message: `${username} welcome to the ${group} group`,
      position:"middle",
      __createdtime__,
    })

    chatRoom = group;
    allUsers.push({ id: socket.id, username, group });
    chatRoomUsers = allUsers.filter((user) => user.group === group);
    socket.to(group).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);
    
  });

  socket.on('send_message', (data) => {
    const { message, username, group, __createdtime__ } = data;

    socket.broadcast.to(group).emit('receive_message',{
      username: username,
      message:message,
      position:"left",
      __createdtime__,
    });

    socket.emit('receive_message_own',{
      username: username,
      message: message,
      position:"right",
      __createdtime__,
    })
    console.log(data)
    //save this message in db as well
  })

  socket.on('leave_room', (data) => {
    const { username, group } = data;
    socket.leave(group);
    const __createdtime__ = Date.now();
    // Remove user from memory
    // allUsers = leaveRoom(socket.id, allUsers);
    // socket.to(group).emit('chatroom_users', allUsers);
    socket.to(group).emit('receive_message', {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
      position:"middle",
      __createdtime__,
    });
    
    console.log(`${username} has left the chat`);
  });

});


server.listen(4000, () => 'Server is running on port 4000');
