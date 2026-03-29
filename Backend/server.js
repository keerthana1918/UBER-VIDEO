const http = require('http');
require("dotenv").config();
const app = require("./app");
const { Server } = require('socket.io');

// ✅ Use dynamic PORT (important for Render)
const PORT = process.env.PORT || 5000;

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Allowed origins (safe handling)
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5179",
    process.env.FRONTEND_URL
].filter(Boolean);

// ✅ Socket.io setup
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true
    }
});

// ✅ Socket connection
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

// ✅ Start server
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});