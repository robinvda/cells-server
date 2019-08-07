const microtime = require('microtime');

class Loop
{
    constructor(state) {
        this._tickLength = 1000;

        this._tick = 0;
        this._previousTime = null;
        this._running = null;

        this._state = state;
    }

    stop() {
        this._running = false;
    }

    start(callback = () => {}) {
        this._tick = 0;
        this._previousTime = microtime.now();
        this._running = true;

        this.tick(callback);
    }

    tick(callback = () => {}) {
        if (! this._running) return;

        setTimeout(() => { this.tick(callback); }, this._tickLength);

        let now = microtime.now();

        let delta = (now - this._previousTime) / 1000;

        this._update(delta);

        callback();

        this._previousTime = now;

        this._tick++;
    }

    _update(delta) {
        // TODO Update `_state`
    }
}

module.exports = Loop;
