const http = require('http');
require("dotenv").config();
const app = require("./app");
const { Server } = require('socket.io');

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "http://localhost:5179",
            process.env.FRONTEND_URL // deployed frontend
        ],
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Socket connection
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('message', (data) => {
        console.log("Message:", data);
        io.emit('message', data); // broadcast
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});