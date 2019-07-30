const Cells = require('./Cells');

class Column {

    constructor(size) {

        this.cells = new Cells(size);

    }

    properties() {
        return {
            cells: this.cells.properties()
        }
    }

}

module.exports = Column;