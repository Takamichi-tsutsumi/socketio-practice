var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs');

app.listen(1337);

function handler(req, res) {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error');
    }
    res.writeHead(200);
    res.write(data);
    res.end();
  })
}

io.sockets.on('connection', function(socket) {
  var client_name;
  socket.on('emit_from_client', function(data) {
    socket.join(data.room);
    socket.emit('emit_from_server', 'you are in ' + data.room);
    socket.broadcast.to(data.room).emit('emit_from_server', data.msg);
    // if (data.name) {
    //   client_name = data.name;
    // }
    // if (client_name) {
    //   io.sockets.emit('emit_from_server', '[' + client_name + '] : ' + data.msg);
    // } else {
    //   io.sockets.emit('emit_from_server', '[' + socket.id + '] : ' + data.msg);
    // }
  });
});