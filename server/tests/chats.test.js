const app = require('../app');
const { Chat, User } = require('../models');
const request = require('supertest');
const { signToken } = require('../helpers/jwt');

const appJSON = 'application/json';

const data = {
  BuyerId: 1,
  SellerId: 1,
  message: 'hip hip eco hippies',
  fullName: 'halo',
};
const userCreator = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'buyer@mail.com',
  phoneNumber: 123,
  picture: 'picture',
  role: 'buyer',
  password: 'password',
};

let userToken = '';

beforeAll(async () => {
  await Chat.bulkCreate(data);

  const user = await User.create(userCreator);
  userToken = signToken({
    id: user.id,
    email: user.email,
    role: user.role,
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
  test('Should return {id, BuyerId, SellerId, message, fullName} [200]', (done) => {
    request(app)
      .get('/chats')
      // .expect('Accept', appJSON)
      .expect('access_token', userToken)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', expect.any(Number));
        expect(response.body).toHaveProperty('BuyerId', expect.any(Number));
        expect(response.body).toHaveProperty('SellerId', expect.any(Number));
        expect(response.body).toHaveProperty('message', expect.any(String));
        expect(response.body).toHaveProperty('fullName', expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
