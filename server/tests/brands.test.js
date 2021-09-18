const app = require('../app');
const { Brand } = require('../models');
const request = require('supertest');

const data = [{ name: 'brand1' }, { name: 'brand2' }];

beforeAll((done) => {
  Brand.bulkCreate(data)
    .then(() => {
      done();
    })
    .catch((err) => done(err));
});
afterAll((done) => {
  Brand.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  })
    .then(() => {
      done();
    })
    .catch((err) => done(err));
});

describe('GET /brands [success]', () => {
  test('Should return {id, name} [200]', (done) => {
    request(app)
      .get('/brands')
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
