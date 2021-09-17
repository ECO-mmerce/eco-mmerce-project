const app = require('../app');
const { User } = require('../models');
const request = require('supertest');

const user = {
  firstName: 'First',
  lastName: 'Last',
  email: 'test@email.id',
  phoneNumber: '087777771111',
  picture:
    'https://image.shutterstock.com/image-illustration/male-default-placeholder-avatar-profile-260nw-582509551.jpg',
  role: 'buyer',
  password: 'inipassword',
};

afterAll((done) => {
  User.destroy({
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

describe('POST /users/register [success]', () => {
  test('Should return {id, email} [201]', (done) => {
    request(app)
      .post('/users/register')
      .set('Accept', 'application/json')
      .send(user)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id', expect.any(Number));
        expect(response.body).toHaveProperty('email');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
