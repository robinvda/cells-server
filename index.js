const http = require('http').createServer();
const io = require('socket.io')(http);
const _ = require('lodash');

const State = require('./state.js');
const state = new State();

const Loop = require('./loop.js');
const loop = new Loop(State);

const Game = require('./game/game.js');

const hostname = '0.0.0.0';
const port = 3000;

let lobby = {
    players: [],

    games: []
};

let users = {};

http.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);

    loop.run(() => {

        _.each(lobby.games, (game) => {
            game.checkState(() => {
                broadcast('game-state', game, game.id);
            });
        });

    });
});

io.on('connection', function(socket){
    console.info('User connected');

    users[socket.id] = {
        id: socket.id,
        name: null
    };

    on(socket, 'disconnect', (data) => {
        console.log('User disconnected');

        delete users[socket.id];
    });

    on(socket, 'save-name', (name) => {
        users[socket.id].name = name;

        emit(socket, 'name-saved', name);

        lobby.players.push(users[socket.id]);
    });

    on(socket, 'join-lobby', () => {
        broadcast('lobby-state', lobby);
    });

    on(socket, 'create-game', (data) => {
        let game = new Game(
            Date.now(),
            data.name,
            socket.id,
            1
        );

        game.players.push(users[socket.id]);

        lobby.games.push(game);

        _.remove(lobby.players, (player) => { return player.id == socket.id; });

        broadcast('lobby-state', lobby);

        socket.join(game.id);

        emit(socket, 'joined-game', game);
    });

    on(socket, 'join-game', (data) => {
        let game = _.find(lobby.games, ['id', data.id]);
        game.players.push(users[socket.id]);

        _.remove(lobby.players, (player) => { return player.id == socket.id; });

        broadcast('lobby-state', lobby);

        socket.join(game.id);

        emit(socket, 'joined-game', game);

        broadcast('game-players', game.players, game.id);
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
    console.log('sent:', message);

    return socket.emit(message, data);
}

function broadcast(message, data = null, room = null) {
    console.log('broadcasted:', message);

    if (room) return io.to(room).emit(message, data);

    return io.emit(message, data);
}

function on(socket, message, callback) {
    socket.on(message, (data) => {
        console.log('received:', message);

        callback(data);
    });
}
