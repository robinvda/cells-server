class Cell {

    constructor() {

        this.color = '#FFFFFF';

        this.owner = null;

        this.type = null;

    }

    properties() {
        return {
            color: this.color,
            owner: this.owner,
            type: this.type
        }
    }

}

module.exports = Cell;