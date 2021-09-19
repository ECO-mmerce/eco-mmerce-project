const app = require('../app');
const { Category } = require('../models');
const request = require('supertest');

const data = [{ name: 'category1' }, { name: 'category2' }];

beforeAll((done) => {
  Category.bulkCreate(data)
    .then(() => {
      done();
    })
    .catch((err) => done(err));
});
afterAll((done) => {
  Category.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  })
    .then(() => {
      done();
    })
    .catch((err) => done(err));
});

describe('GET /categories [success]', () => {
  test('Should return {id, name} [200]', (done) => {
    request(app)
      .get('/categories')
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
