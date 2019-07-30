import Socket from './../Socket';

export default class User extends Socket {

    constructor(socket) {
        super(socket);

        this.id = this._socket.id;

        this.name = null;

    }

    properties() {
        return {
            id: this.id,
            name: this.name,
            room: this.room
        }
    }

}
