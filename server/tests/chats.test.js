const app = require('../app');
const { Chat, User } = require('../models');
const request = require('supertest');
const { signToken } = require('../helpers/jwt');

const appJSON = 'application/json';

const firstName = 'firstName';
const lastName = 'lastName';
const phoneNumber = 123;
const picture = 'picture';
const password = 'password';

const sellerCreator = {
  firstName,
  lastName,
  email: 'seller@mail.com',
  phoneNumber,
  picture,
  role: 'seller',
  password,
};
const buyerCreator = {
  firstName,
  lastName,
  email: 'buyer@mail.com',
  phoneNumber,
  picture,
  role: 'buyer',
  password,
};

let sellerToken = '';
let buyerToken = '';
let sellerId = 0;
let buyerId = 0;

beforeAll(async () => {
  const seller = await User.create(sellerCreator);
  sellerId = seller.id;
  sellerToken = signToken({
    id: seller.id,
    email: seller.email,
    role: seller.role,
  });
  const buyer = await User.create(buyerCreator);
  buyerId = buyer.id;
  buyerToken = signToken({
    id: buyer.id,
    email: buyer.email,
    role: buyer.role,
  });

  await Chat.create({
    SellerId: sellerId,
    BuyerId: buyerId,
    message: 'hip hip eco hippies',
    fullName: 'halo',
  });
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Chat.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe('GET /chats/:id [success]', () => {
  test('Should return [{BuyerId, SellerId, message, fullName}] [200]', (done) => {
    request(app)
      .get(`/chats/${buyerId}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .then((response) => {
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              BuyerId: buyerId,
              SellerId: sellerId,
              message: expect.any(String),
              fullName: expect.any(String),
            }),
          ])
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('GET /sellers/chats [success]', () => {
  test('Should return [{BuyerId, SellerId, User}] [200]', (done) => {
    request(app)
      .get(`/sellers/chats`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .then((response) => {
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              BuyerId: buyerId,
              SellerId: sellerId,
              User: expect.objectContaining({
                id: expect.any(Number),
                firstName,
                lastName,
              }),
            }),
          ])
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
