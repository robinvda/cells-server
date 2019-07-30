import Users from './Users/Users';
import Games from './Games/Games';

export default class Lobby {

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
