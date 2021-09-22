const app = require('../app');
const http = require('http');
const https = require('https');
const fs = require('fs');

const PORT = process.env.PORT || 4000;
const SECURE_PORT = process.env.SECURE_PORT || 4001;

const privateKey = fs.readFileSync(
  '/etc/letsencrypt/live/ecommerce.marcotiger.my.id/privkey.pem'
);
const certificate = fs.readFileSync(
  '/etc/letsencrypt/live/ecommerce.marcotiger.my.id/fullchain.pem'
);

const server = http.createServer(app);
const httpsServer = https.createServer(
  {
    key: privateKey,
    cert: certificate,
  },
  app
); // Add credentials here

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

httpsServer.listen(SECURE_PORT, () => {
  `Https server running on port ${SECURE_PORT}`;
});

module.exports = { server, httpsServer };
