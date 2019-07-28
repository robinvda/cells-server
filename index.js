const Server = require('./server/Server');
global.Server = new Server('0.0.0.0', 3000);

global.Server.start();
