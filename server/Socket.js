class Socket {

    constructor(socket) {

        this._socket = socket;

        this.room = null;

    }

    on(message, callback = () => {}) {
        this._socket.on(message, (data) => {
            console.log('Received:', message);

            callback(data);
        });
    }

    emit(message, data = null) {
        console.log('Sent:', message);

        this._socket.emit(message, data);
    }

    broadcast(message, data = null) {
        console.log('Sent to others:', message);

        this._socket.broadcast.to(this.room).emit(message, data);
    }

    join(id) {
        if (this.room) {
            this.leave(this.room);
        }

        this._socket.join(id);

        this.room = id;
    }

    leave(id) {
        this._socket.leave(id);

        this.room = null;
    }

}

module.exports = Socket;