import Room from './../Room';
import Loop from './Game/Loop';
import State from './Game/State';

import Players from './Players/Players';
import Player from './Players/Player';
import Color from './Players/Color';

export default class Game extends Room {

    constructor(io, name, user) {
        super(io);

        this.id = this.room;
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

        this.loop = new Loop();

        this.state = new State();

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

    start() {
        this.countdown(() => {
            this.loop.start((delta) => {



                this.emit('game-state', this.state.properties());

            });
        }, 5);
    }

    stop() {
        this.loop.stop();
    }

    countdown(callback = () => {}, count) {
        setTimeout(() => {
            if (count == 0) return callback();

            this.emit('game-countdown', count);

            this.countdown(callback, --count);
        }, 1000);
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

    isHost(user) {
        return this.user.id == user.id;
    }

}
