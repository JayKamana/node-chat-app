let socket = io();

socket.on('connect', function() {
  console.log('connected to server')
})

socket.on('disconnect', function() {
  console.log('Disconnected from server');
})

socket.on('newMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let li = $('<li></li>');
  li.text(`${formattedTime} ${message.from}: ${message.text}`);

  $('#messages').append(li);
})

socket.on('newLocationMessage', function (message){
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let li = $('<li></li>');
  let a = $(`<a target='_blank'>My current location</a>`)
  li.text(`${formattedTime} ${message.from}: `);
  a.attr('href', message.url);

  li.append(a);
  $('#messages').append(li);
})

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  let messageTextbox = $('[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function (){
    messageTextbox.val("");
  })
})

let locationButton = $('#send-location');

locationButton.on('click', function(e){
  if(!navigator.geolocation){
    return alert('Geolocation is not supported by your browser')
  }
  locationButton.attr('disabled', 'disabled').text('Sendinng location ..')
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location')
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function(){
    locationButton.removeAttr('disabled').text('Send location')
    alert ('Unable to fetch location')
  })

})