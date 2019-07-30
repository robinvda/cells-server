import User from './Users/User';
import Users from './Users/Users';
import Lobby from './Lobby';
import Game from './Games/Game';

export default class Server {

    constructor(address, port) {

        this.address = address;
        this.port = port;

        this.users = new Users();

        this.lobby = new Lobby();

        this.http = require('http').createServer();
        this.io = require('socket.io')(this.http);

    }

    start() {
        this.http.listen(this.port, this.address, () => {
            console.info(`Server running at http://${this.address}:${this.port}/`);

            //
        });

        this.initConnectionListener();
    }

    initConnectionListener() {
        this.io.on('connection', (socket) => {
            console.info(`New connection`);

            let user = new User(socket);

            this.users.add(user);

            user.on('disconnect', () => {
                console.log('Disconnected');

                user.broadcast('user-left', user.properties());

                this.lobby.removeUser(user);

                this.users.remove(user.id);
            });

            user.on('registration-request', (name) => {
                user.name = name;

                user.emit('registered', user.properties());
            });

            user.on('join-lobby-request', () => {
                user.join('lobby');

                if (! this.lobby.users.has(user.id)) {
                    this.lobby.users.add(user);
                }

                user.broadcast('user-joined', user.properties());

                user.emit('joined-lobby', this.lobby.properties());
            });

            user.on('create-game-request', (data) => {
                let game = new Game(this.io, data.name, user);

                this.lobby.games.add(game);

                user.emit('created-game', game.properties());

                user.broadcast('game-created', game.properties());
            });

            user.on('join-game-request', (id) => {
                let game = this.lobby.games.find(id);

                if (! game) {
                    return user.emit('join-game-failed');
                }

                if (! game.players.has(user.id)) {
                    game.createPlayer(user);
                }

                user.broadcast('user-left', user.properties());

                user.join(game.id);

                user.broadcast('user-joined', user.properties());

                user.emit('joined-game', game.properties());
            });

            user.on('leave-game-request', (id) => {
                let game = this.lobby.games.find(id);

                if (! game) {
                    return user.emit('leave-game-failed');
                }

                if (game.players.has(user.id)) {
                    game.deletePlayer(user.id);
                }

                user.broadcast('user-left', user.properties());

                user.emit('left-game', game.properties());
            });

            user.on('start-game-request', (id) => {
                let game = this.lobby.games.find(id);

                if (! game) {
                    return user.emit('start-game-failed');
                }

                if (! game.isHost(user)) {
                    return user.emit('start-game-failed');
                }

                game.start();


            });
        });
    }

}
