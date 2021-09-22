const server = require('./socketConfig');
const { server: http, httpsServer } = require('./bin/http');
server.attach(http);
server.attach(httpsServer);

// nodemon server.js
