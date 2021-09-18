const socket = require('socket.io');
const app = require('../app');

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET'],
  },
});

io.on('connection', (socket) => {
  console.log(`user ${socket.id} connected`);
});
