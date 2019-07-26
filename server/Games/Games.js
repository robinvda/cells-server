const _ = require('lodash');

class Games {

    constructor() {
        this.items = [];
    }

    properties() {
        return _.map(this.items, (item) => item.properties());
    }

    deletePlayer(id) {
        _.each(this.items, (game) => {
            game.deletePlayer(id);
        });
    }

    add(game) {
        this.items.push(game);
    }

    remove(id) {
        let index = this.findIndex(id);

        if (index < 0) return null;

        return this.items.splice(index, 1)[0];
    }

    has(game) {
        return this.findIndex(game.id) >= 0;
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

module.exports = Games;
