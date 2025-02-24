const express = require("express");
const http = require("http");
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
cors: {
origin: "*",
credentials: true,
},
});

const groups = {};


// Handle WebSocket connections here
io.on("connection", (socket) => {
console.log("A new user has connected", socket.id);


 // Join a private group
  socket.on("joinGroup", ({ groupId, username }) => {
    if(groupId) {
      socket.join(groupId);
    }
  if (!groups[groupId]) {
    groups[groupId] = [];
  }
  groups[groupId].push({ socketId: socket.id, username });
  io.to(groupId).emit("groupUpdate", groups[groupId]);
});


// Handle incoming messages
socket.on("message", ({ text, groupId, userId, username }) => {
  if(!text.trim()) return;


  const message = {
    text,
    timestamp: new Date(),
    userId,
    username,
    groupId: groupId || "global",
  };
   if(groupId) {
     io.to(groupId).emit("message", message); // Send message only to the group
   } else {
    io.emit("message", message);
   }
});


 // Listen for incoming messages from clients
//  socket.on("message", (message) => {
  // Broadcast the message to all connected clients
//   io.emit("message", message);
//  });




 // Handle disconnections
 socket.on("disconnect", () => {
  console.log(socket.id, " disconnected");
  Object.keys(groups).forEach((groupId) => {
    groups[groupId] = groups[groupId].filter((user) => user.socketId !== socket.id);
    io.to(groupId).emit("groupUpdate", groups[groupId]);
  });
});
});


server.listen(8080, () => {
 console.log("Server is running on port 8080");
});