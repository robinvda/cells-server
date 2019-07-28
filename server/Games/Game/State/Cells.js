const _ = require('lodash');

const Cell = require('./Cell');

class Cells {

    constructor(size) {

        this.items = [];

        for(let i = 0; i < size; i++) {
            this.items.push(new Cell());
        }

    }

    properties() {
        return _.map(this.items, (item) => item.properties());
    }

}

module.exports = Cells;