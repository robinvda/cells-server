import Players from './Players/Players';
import Player from './Players/Player';
import Color from './Players/Color';

export default class Game {

    constructor(name, user) {

        this.id = Date.now();
        this.name = name;
        this.user = user;
        this.slots = 4;

        this.players = new Players();

        this.availableColors = [
            new Color('Red', 'red'),
            new Color('Green', 'green'),
            new Color('Blue', 'blue'),
            new Color('Yellow', 'yellow')
        ];

    }

    properties() {
        return {
            id: this.id,
            name: this.name,
            user: this.user ? this.user.properties() : null,
            slots: this.slots,
            players: this.players.properties(),
            availableColors: this.availableColors
        }
    }

    createPlayer(user) {
        let player = new Player(user);

        player.color = this.availableColors.splice(Math.floor(Math.random() * this.availableColors.length), 1)[0];

        this.players.add(player);
    }

    deletePlayer(id) {
        let player = this.players.remove(id);

        if (! player) return null;

        this.availableColors.push(player.color);
    }

}
