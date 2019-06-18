const microtime = require('microtime');

class Loop
{
    constructor(state) {
        this._tickLength = 1000;

        this._tick = 0;
        this._previousTime = null;

        this._state = state;
    }

    run(callback = () => {}) {
        this._tick = 0;
        this._previousTime = microtime.now();

        this.tick(callback);
    }

    tick(callback = () => {}) {
        setTimeout(() => { this.tick(); }, this._tickLength);

        let now = microtime.now();

        let delta = (now - this._previousTime) / 1000;

        this._update(delta);

        callback();

        this._previousTime = now;

        this._tick++;

        console.log(this._tick);
    }

    _update(delta) {
        // TODO Update `_state`
    }
}

module.exports = Loop;