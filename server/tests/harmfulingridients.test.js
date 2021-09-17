const app = require('../app');
const { HarmfulIngridient } = require('../models');
const request = require('supertest');

const appJSON = 'application/json';

const data = [
  { name: 'bahan1', createdAt: new Date(), updatedAt: new Date() },
  { name: 'bahan2', createdAt: new Date(), updatedAt: new Date() },
];

beforeAll((done) => {
  HarmfulIngridient.bulkCreate(data)
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});
afterAll((done) => {
  HarmfulIngridient.destroy({
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

describe('GET /harmfulingridients [success]', () => {
  test('Should return {id, name} [200]', (done) => {
    request(app)
      .get('/harmfulingridients')
      .expect('Accept', appJSON)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
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
