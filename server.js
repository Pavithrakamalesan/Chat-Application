const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinRoom", ({ username, room }) => {
        socket.join(room);
        
        socket.broadcast.to(room).emit("message", {
            username: "System",
            message: `${username} has joined.`,
            time: new Date().toLocaleTimeString()
        });
    });

    socket.on("chatMessage", (data) => {
        io.to(data.room).emit("message", {
            username: data.username,
            message: data.message,
            time: new Date().toLocaleTimeString()
        });
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
