import _ from 'lodash';

export default class Players {

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

    has(id) {
        return this.findIndex(id) >= 0;
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
