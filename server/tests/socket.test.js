const io = require('socket.io-client');
const server = require('../socketConfig');

const sellerId = 1;
const buyerId = 2;

describe('Suite of unit tests', function () {
  //ngejalain servernya
  server.attach(4000);
  // let sender;
  // let receiver;
  let socket;

  beforeEach(function (done) {
    // Setup
    socket = io.connect('http://localhost:4000', {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true,
    });

    socket.on('connect', function () {
      console.log('worked...');
      done();
    });
    socket.on('disconnect', function () {
      console.log('disconnected...');
    });
  });

  afterEach(function (done) {
    // Cleanup
    if (socket.connected) {
      console.log('disconnecting...');
      socket.disconnect();
    } else {
      // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
      console.log('no connection to break...');
    }

    done();
  });
  // afterAll(function (done) {
  //   // server.detach();
  //   server.close();
  // });

  describe('Chat tests', function () {
    test('Sending message to the chat room', (done) => {
      const data = {
        message: {
          BuyerId: buyerId,
          SellerId: sellerId,
          message: 'Jest testing socket',
          fullName: 'Jest no Socket',
        },
      };

      socket.emit('joinRoom', { sellerId, buyerId });

      socket.emit('chat', data);

      socket.on('message', (dataRes) => {
        expect(dataRes).toBeInstanceOf(Object);
        expect(dataRes).toHaveProperty('BuyerId', buyerId);
        expect(dataRes).toHaveProperty('SellerId', sellerId);
        expect(dataRes).toHaveProperty('message', 'Jest testing socket');
        expect(dataRes).toHaveProperty('fullName', 'Jest no Socket');
        done();
      });
    });

    // test('Show typing message', (done) => {
    //   let payload = {
    //     room: 'Teknologi Informasi',
    //     name: 'Budi'
    //   }
    //   socket.emit('typing-start', payload)

    //   socket.on('typing-start', data => {
    //     expect(data).toBe(payload.name)
    //     done()
    //   })
    // })
  });
});
