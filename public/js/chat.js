var socket = io();

function scrollToBottom(){
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    }
  })
})

socket.on('disconnect', function() {
  console.log('Disconnected from server');
})

socket.on('updateUserList', function(users){
  var ol = $('<ol></lo>');

  users.forEach(function(user){
    ol.append($('<li></li>').text(user));
  });

  $('#users').html(ol);

})

socket.on('newMessage', function (message) {
  
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
})

socket.on('newLocationMessage', function (message){

  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
})

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextbox = $('[name=message]')

  socket.emit('createMessage', {
    text: messageTextbox.val()
  }, function (){
    messageTextbox.val("");
  })
})

var locationButton = $('#send-location');

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