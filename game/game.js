let Grid = require('./../state/grid');

class Game {

    constructor(id, name, host, slots) {

        this._states = {
            idle: 'Idle',
            waiting: 'Waiting for players...',
            countdown5: 'Starting in 5',
            countdown4: 'Starting in 4',
            countdown3: 'Starting in 3',
            countdown2: 'Starting in 2',
            countdown1: 'Starting in 1',
            running: 'Running',
            finished: 'Finished'
        };

        this.id = id;
        this.name = name;
        this.host = host;
        this.slots = slots;

        this.state = this._states.waiting;

        this.players = [];

        this.grid = new Grid();
        this.grid.fresh();

    }

    checkState(callback = () => {}) {
        switch (this.state) {
            case this._states.idle:

                break;
            case this._states.waiting:
                if (this.players.length == this.slots) {
                    this.setCountdown(5, callback);
                }
                break;
            case this._states.running:
                callback();
                break;
        }
    }

    setCountdown(value, callback = () => {}) {
        this.state = this._states['countdown' + value];

        callback();

        setTimeout(() => {
            if (value <= 1) {
                this.state = this._states.running;
            } else {
                this.setCountdown(value - 1, callback);
            }
        }, 1000);
    }

}

module.exports = Game;
