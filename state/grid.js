let Row = require('./grid/row');

class Grid {

    constructor() {

        this.rows = [];

    }

    fresh(size = 20) {

        for (let i = 0; i < size; i++) {
            let row = new Row();
            row.fresh();

            this.rows.push(row);
        }

    }

}

module.exports = Grid;