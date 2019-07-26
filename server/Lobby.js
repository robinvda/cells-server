const _ = require('lodash');

const Users = require('./Users/Users');
const Games = require('./Games/Games');

class Lobby {

    constructor() {

        this.users = new Users();

        this.games = new Games();

    }

    properties() {
        return {
            users: this.users.properties(),
            games: this.games.properties()
        }
    }

    removeUser(user) {
        this.users.remove(user.id);

        this.games.deletePlayer(user.id);
    }

}

module.exports = Lobby;
