var socket = io();

function scrollToBottom() {
    const messageList = document.getElementById('messages');
    const newMessage = messageList.lastElementChild;
    const prevMessage = newMessage.previousElementSibling;
   
    const clientHeight = messageList.clientHeight;
    const scrollTop = messageList.scrollTop;
    const scrollHeight = messageList.scrollHeight;
   
    const newMessageStyle = window.getComputedStyle(newMessage, null);
    const newMessageHeight = parseInt(newMessageStyle.getPropertyValue("height"));
    let prevMessageHeight = 0;
    if (prevMessage) {
      const prevMessageStyle = window.getComputedStyle(prevMessage, null);
      prevMessageHeight = parseInt(prevMessageStyle.getPropertyValue("height"));
    }
   
    if ((clientHeight + scrollTop + newMessageHeight) >= scrollHeight) {
      messageList.scrollTop = scrollHeight;
    }
}

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected to server');
});

socket.on('newMessage', function(message) {
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: moment(message.createdAt).format('H:mm')
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: moment(message.createdAt).format('H:mm')
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function(data) {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e) {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');

        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');;
        alert('Unable to fetch location.')
    });
});