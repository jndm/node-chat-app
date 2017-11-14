var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'kari',
        text: 'create this message'
    });

});

socket.on('disconnect', function() {
    console.log('Disconnected to server');
});

socket.on('newMessage', function(message) {
    console.log('New message', message);
});