var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

console.log("node服务");



io.on('connection', function (socket) {
 
  socket.on('hello', function (data) {
    console.log(data);
    io.emit("hello",data);
    console.log("发送了"+data);
  });
});

server.listen(4000,function(data){
    console.log("4000");
});