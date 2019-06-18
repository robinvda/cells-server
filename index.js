const http = require('http').createServer();
const io = require('socket.io')(http);

const State = require('./state.js');
const state = new State();

const Loop = require('./loop.js');
const loop = new Loop(State);

const hostname = '0.0.0.0';
const port = 3000;

http.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);

    loop.run(() => {

    });
});

io.on('connection', function(socket){
    console.info('User connected');

    socket.on('disconnect', function(){
        console.log('User disconnected');
    });

    socket.on('join', function(){
        console.log('User joined');

        let player = state.addPlayer(socket.id);

        if (! player) return socket.emit('game-full');

        socket.emit('player', player);

        socket.emit('grid', state.grid);
    });
});
