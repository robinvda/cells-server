class Player {

    constructor(user) {

        this.id = user.id;
        this.name = user.name;

        this.user = user;

        this.color = null;

    }

    properties() {
        return {
            id: this.id,
            name: this.name,
            user: this.user.properties(),
            color: this.color ? this.color.properties() : null
        }
    }

}

module.exports = Player;
