const app = require('../app');
const socket = require('socket.io');

const { Chat } = require('../models');

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
  socket.on('joinRoom', ({ sellerId, buyerId }) => {
    const roomname = `chat-seller-${sellerId}-buyer-${buyerId}`;
    // Join to room
    console.log(roomname);
    socket.join(roomname);

    // // Emit to sender only
    // socket.emit('message', {
    //   text: `Connected to ${isBuyer ? 'seller' : 'buyer'}`,
    // });

    // // Emit to everyone except sender
    // socket.broadcast.in(roomname).emit('message', {
    //   text: `${name} has entered the chat`,
    // });
  });

  socket.on('chat', ({ message }) => {
    const roomname = `chat-seller-${message.SellerId}-buyer-${message.BuyerId}`;
    Chat.create(message);
    console.log(message);
    console.log(roomname);

    io.in(roomname).emit('message', message);
  });
});
