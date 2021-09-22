const app = require('../app');
const { HarmfulIngridient } = require('../models');
const request = require('supertest');

const data = [{ name: 'ingridient1' }, { name: 'ingridient2' }];

beforeAll((done) => {
  HarmfulIngridient.bulkCreate(data)
    .then((resp) => {
      // console.log(resp.body);
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

describe('GET /ingridients [success]', () => {
  test('Should return {id, name} [200]', (done) => {
    request(app)
      .get('/ingridients')
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
