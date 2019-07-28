class Socket {

    constructor(io) {

        this._io = io;

        this.room = Date.now();

    }

    emit(message, data = null) {
        console.log(this.room + ' sent:', message);

        this._io.in(this.room).emit(message, data);
    }

}

module.exports = Socket;