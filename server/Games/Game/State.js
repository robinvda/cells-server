const Columns = require('./State/Columns');

class State {

    constructor() {

        this.columns = new Columns(10);

        this.columns.clear();

    }

    properties() {
        return {
            columns: this.columns.properties()
        }
    }

}

module.exports = State;