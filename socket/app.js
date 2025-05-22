import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});


let onlineUser = [];  //to store all users


const addUser = (userId, socketId) => {
  //checking if user already existing in "onlineUser" array or not
  const userExits = onlineUser.find((user) => user.userId === userId);

  if (!userExits) {
    onlineUser.push({ userId, socketId });  //add to array
  }
};


const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};


const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};


io.on("connection", (socket) => {
  //when connection exist-->add user to the array
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  //listening event from chat.jsx (USER_1) -----> step-2
  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);

    //again from socket server, sending data to receiver (USER_2) ----> step-3
    if (receiver) {
      // If the receiver is found, send the message
      io.to(receiver.socketId).emit("getMessage", data);
    } else {
      // Handle the case where the receiver is not online or does not exist
      console.error(`Receiver with ID ${receiverId} not found.`);
    }
  });

  //when disconnected-->remove user from the array
  socket.on("disconnect", () => {
    removeUser(socket.id);
  });

});

io.listen("4000");
