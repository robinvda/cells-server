const _ = require('lodash');

const Column = require('./Column');

class Columns {

    constructor(size) {

        this.items = [];

        for(let i = 0; i < size; i++) {
            this.items.push(new Column(size));
        }

    }

    properties() {
        return _.map(this.items, (item) => item.properties());
    }

    clear() {

    }

}

module.exports = Columns;