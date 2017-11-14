const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log('New user connected!');

    socket.emit('newMessage', {
        from: 'jari',
        text: 'new text',
        createdAt: 123
    });

    socket.on('createMessage', (message) => {
        console.log('Created message', message);
    });

    socket.on('disconnect', (socket) => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});