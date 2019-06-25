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

    on(socket, 'disconnect', (data) => {

    });

    on(socket, 'join', (data) => {
        let player = state.addPlayer(socket.id);

        if (! player) return emit(socket, 'game-full');

        emit(socket, 'player', player);

        emit(socket, 'grid', state.grid);

        setTimeout(() => {
            emit(socket, 'game-start');
        }, 2000);
    });
});

function emit(socket, message, data = null) {
    console.log('outgoing:', message);

    return socket.emit(message, data);
}

function on(socket, message, callback) {
    socket.on(message, (data) => {
        console.log('incoming:', message);

        callback(data);
    });
}
