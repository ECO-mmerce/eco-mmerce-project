const io = require('socket.io')({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET'],
  },
});
const { Chat } = require('./models');

// console.log(io.on, `INI IO`);

io.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});

io.on('connection', (socket) => {
  // all socket listener here

  console.log(`user ${socket.id} connected`);
  socket.on('joinRoom', ({ sellerId, buyerId }) => {
    const roomname = `chat-seller-${sellerId}-buyer-${buyerId}`;
    // Join to room
    console.log(roomname);
    socket.join(roomname);
  });

  socket.on('chat', ({ message }) => {
    const roomname = `chat-seller-${message.SellerId}-buyer-${message.BuyerId}`;
    Chat.create(message);
    console.log(message);
    console.log(roomname);

    io.in(roomname).emit('message', message);
  });
});

module.exports = io;
