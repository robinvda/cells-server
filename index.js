const http = require('http').createServer();
const io = require('socket.io')(http);

const hostname = '0.0.0.0';
const port = 3000;

http.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

io.on('connection', function(socket){
    console.info('User connected');

    socket.on('disconnect', function(){
        console.log('User disconnected');
    });

    socket.on('join', function(){
        console.log('User joined');

        socket.emit('player', 'blue');
    });
});
