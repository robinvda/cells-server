const _ = require('lodash');

class Players {

    constructor() {
        this.items = [];
    }

    properties() {
        return _.map(this.items, (item) => item.properties());
    }

    add(player) {
        this.items.push(player);
    }

    remove(id) {
        let index = this.findIndex(id);

        if (index < 0) return null;

        return this.items.splice(index, 1)[0];
    }

    has(player) {
        return this.findIndex(player.id) >= 0;
    }

    findIndex(id) {
        return _.findIndex(this.items, (item) => {
            return item.id == id;
        });
    }

    find(id) {
        return _.find(this.items, (item) => {
            return item.id == id;
        });
    }

}

module.exports = Players;
