const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');


let publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

const app = express();
let server = http.createServer(app);
let io = socketIO(server)

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  })
});

server.listen(port, () => {
  console.log(`App running on port ${port}`);
});

