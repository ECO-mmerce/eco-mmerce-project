const app = require('../app');
const { User } = require('../models');
const request = require('supertest');

const appJSON = 'application/json';

const firstName = 'First';
const lastName = 'Last';
const email = 'test@email.id';
const phoneNumber = '087777771111';
const picture =
  'https://image.shutterstock.com/image-illustration/male-default-placeholder-avatar-profile-260nw-582509551.jpg';
const roleBuyer = 'buyer';
const roleSeller = 'seller';
const password = 'inipassword';

const user = {
  firstName,
  lastName,
  email,
  phoneNumber,
  picture,
  role: roleBuyer,
  password,
};

const userEmptyEmail = {
  ...user,
  email: '',
};

const userInvalidEmail = {
  ...user,
  email: 'testmail',
};

const userErrName = {
  ...user,
  firstName: '',
  lastName: '',
  email: 'testerrname@email.id',
};

const userErrPhone = {
  ...user,
  phoneNumber: '',
};

const userErrPass = {
  ...user,
  password: '',
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

describe('POST /buyers/register [success]', () => {
  test('Should return {id, email} [201]', (done) => {
    request(app)
      .post('/buyers/register')
      .set('Accept', appJSON)
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

describe('POST /buyers/register [fail]', () => {
  test('Should return {message: "Email already exists"} [400]', (done) => {
    request(app)
      .post('/buyers/register')
      .set('Accept', appJSON)
      .send(user)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(resopnse.body).toHaveProperty('message', 'Email already exists');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Should return [{message: "Invalid email format"}] [400]', (done) => {
    request(app)
      .post('/buyers/register')
      .set('Accept', appJSON)
      .send(userInvalidEmail)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.arrayContaining([{ message: 'Invalid email format' }])
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Should return [{message: "Email cannot be empty"}] [400]', (done) => {
    request(app)
      .post('/buyers/register')
      .set('Accept', appJSON)
      .send(userEmptyEmail)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.arrayContaining([{ message: 'Email cannot be empty' }])
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Should return [{message: "First name cannot be empty"}] [400]', (done) => {
    request(app)
      .post('/buyers/register')
      .set('Accept', appJSON)
      .send(userErrName)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.arrayContaining([{ message: 'First name cannot be empty' }])
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Should return [{message: "Phone number cannot be empty}] [400]', (done) => {
    request(app)
      .post('/buyers/register')
      .set('Accept', appJSON)
      .send(userErrPhone)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.arrayContaining([{ message: 'Phone number cannot be empty' }])
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Should return [{message: "Password cannot be empty"}] [400]', (done) => {
    request(app)
      .post('/buyers/register')
      .set('Accept', appJSON)
      .send(userErrPass)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.arrayContaining([{ message: 'Password cannot be empty' }])
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
