let socket = io();

socket.on('connect', function() {
  console.log('connected to server')

  socket.emit('createMessage', {
    from: 'alice@example.com',
    text: 'Sure, we could meet at 12am'
  })
})

socket.on('disconnect', function() {
  console.log('Disconnected from server');
})

socket.on('newMessage', function (message) {
  console.log('new Message received', message);
})