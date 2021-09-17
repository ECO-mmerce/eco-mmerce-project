const app = require('../app');
const { Chat } = require('../models');
const request = require('supertest');

const appJSON = 'application/json';

const data = 
  {
    BuyerId: 1,
    SellerId: 1,
    message: 'hip hip eco hippies',
    isSeller: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
;

beforeAll((done) => {
  Chat.bulkCreate(data)
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});
afterAll((done) => {
  Chat.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe('GET /chats [success]', () => {
  test('Should return {id, BuyerId, SellerId, message, isSeller} [200]', (done) => {
    request(app)
      .get('/chats')
      .expect('Accept', appJSON)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', expect.any(Number));
        expect(response.body).toHaveProperty('BuyerId', expect.any(Number));
        expect(response.body).toHaveProperty('SellerId', expect.any(Number));
        expect(response.body).toHaveProperty('message', expect.any(String));
        expect(typeof response.body.isSeller).toBe('boolean');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
