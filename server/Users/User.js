export default class User {

    constructor(socket) {

        this.socket = socket;

        this.id = this.socket.id;

        this.name = null;

        this.room = null;

    }

    properties() {
        return {
            id: this.id,
            name: this.name,
            room: this.room
        }
    }

    on(message, callback = () => {}) {
        this.socket.on(message, (data) => {
            console.log('Received:', message, data);

            callback(data);
        });
    }

    emit(message, data = null) {
        console.log('Sent:', message, data);

        this.socket.emit(message, data);
    }

    join(id) {
        if (this.room) {
            this.leave(this.room);
        }

        this.socket.join(id);

        this.room = id;
    }

    leave(id) {
        this.socket.leave(id);

        this.room = null;
    }

}
