const Slot = require('./state/slot.js');
const Player = require('./state/player.js');
const Grid = require('./state/grid.js');

class State {

    constructor() {

        this.players = [];

        this.freeSlots = [
            new Slot('red'),
            new Slot('yellow'),
            new Slot('blue'),
            new Slot('green'),
        ];

        this.grid = new Grid();
        this.grid.fresh();

    }

    addPlayer(id) {
        if (this.freeSlots.length <= 0) return null;

        let randomIndex = Math.floor(Math.random() * this.freeSlots.length);

        let slot = this.freeSlots.splice(randomIndex, 1)[0];

        let player = new Player(id, slot.color);

        this.players.push(player);

        return player;
    }

}

module.exports = State;