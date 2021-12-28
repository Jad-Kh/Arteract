/*
const io = require('socket.io')(5000, {
    cors: {
      origin: "http://localhost:3000",
    }
});

let onlineUsers = [];

const addUser = (userId, socketId) => {
    !onlineUsers.some(user => user.userId === userId) &&
        onlineUsers.push({ userId, socketId });
}

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
}

io.on("connection", (socket) => {
    socket.on("addUser", userId => {
       addUser(userId, socket.id);
       io.emit("getUsers", onlineUsers);
    });
    socket.on("sendNotification", ({senderName, receiverName, type}) => {
        const receiver = getUser(receiverName);
        io.to(receiver.socketId).emit("getNotification", {
            senderName,
            type,
        });
    });
    socket.on("sendText", ({senderName, receiverName, text}) => {
        const receiver = getUser(receiverName);
        io.to(receiver.socketId).emit("getText", {
          senderName,
          text,
        });
    });
    socket.on("disconnect", () => {
        removeUser(socket.id);
    });
});
*/