let Cell = require('./cell');

class Row {

    constructor() {

        this.cells = [];

    }

    fresh(size = 20) {

        for (let i = 0; i < size; i++) {
            this.cells.push(new Cell());
        }

    }

}

module.exports = Row;