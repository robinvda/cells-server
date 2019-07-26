const _ = require('lodash');

class Users {

    constructor() {
        this.items = [];
    }

    properties() {
        return _.map(this.items, (item) => item.properties());
    }

    add(user) {
        this.items.push(user);
    }

    remove(id) {
        let index = this.findIndex(id);

        if (index < 0) return null;

        return this.items.splice(index, 1)[0];
    }

    has(user) {
        return this.findIndex(user.id) >= 0;
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

module.exports = Users;