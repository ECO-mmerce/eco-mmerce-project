const request = require('supertest');

const app = require('../app');
const { User } = require('../models');

// Data

const appJSON = 'application/json';

const firstName = 'First';
const lastName = 'Last';
const email = 'test@email.id';
const email1 = 'test1@email.id';
const email2 = 'test2@email.id';
const email3 = 'test3@email.id';
const email4 = 'test4@email.id';
const email5 = 'test5@email.id';
const email6 = 'test6@email.id';
const email7 = 'test7@email.id';
const phoneNumber = '087777771111';
const picture =
  'https://image.shutterstock.com/image-illustration/male-default-placeholder-avatar-profile-260nw-582509551.jpg';
const roleBuyer = 'buyer';
const roleSeller = 'seller';
const password = 'inipassword';

// User Buyer
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
  email: email1,
};

const userErrPhone = {
  ...user,
  phoneNumber: '',
  email: email2,
};

const userErrPass = {
  ...user,
  password: '',
  email: email3,
};

const userLogin = {
  email,
  password,
};

const userLoginErrEmail = {
  email: '',
  password,
};

const userLoginErrPass = {
  email,
  password: '',
};

// User Seller

const seller = {
  firstName,
  lastName,
  email: email4,
  phoneNumber,
  picture,
  role: roleSeller,
  password,
};

const sellerEmptyEmail = {
  ...seller,
  email: '',
};

const sellerInvalidEmail = {
  ...seller,
  email: 'testmail',
};

const sellerErrName = {
  ...seller,
  firstName: '',
  lastName: '',
  email: email5,
};

const sellerErrPhone = {
  ...seller,
  phoneNumber: '',
  email: email6,
};

const sellerErrPass = {
  ...seller,
  password: '',
  email: email7,
};

const sellerLogin = {
  email: email4,
  password,
};

const sellerLoginErrEmail = {
  email: '',
  password,
};

const sellerLoginErrPass = {
  email: email4,
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

// Test Buyer

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
        expect(response.body).toHaveProperty('message', 'Email already exists');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Should return {message: "Invalid email format"} [400]', (done) => {
    request(app)
      .post('/buyers/register')
      .set('Accept', appJSON)
      .send(userInvalidEmail)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({ message: 'Invalid email format' })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Should return {message: "Email cannot be empty, Invalid email format"} [400]', (done) => {
    request(app)
      .post('/buyers/register')
      .set('Accept', appJSON)
      .send(userEmptyEmail)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'Email cannot be empty, Invalid email format',
          })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Should return {message: "First name cannot be empty"} [400]', (done) => {
    request(app)
      .post('/buyers/register')
      .set('Accept', appJSON)
      .send(userErrName)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({ message: 'First name cannot be empty' })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Should return {message: "Phone number cannot be empty} [400]', (done) => {
    request(app)
      .post('/buyers/register')
      .set('Accept', appJSON)
      .send(userErrPhone)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({ message: 'Phone number cannot be empty' })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Should return {message: "Password cannot be empty"} [400]', (done) => {
    request(app)
      .post('/buyers/register')
      .set('Accept', appJSON)
      .send(userErrPass)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({ message: 'Password cannot be empty' })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('POST /buyers/login [success]', () => {
  test('Should return {id, firstName, lastName, picture, role, access_token} [200]', (done) => {
    request(app)
      .post('/buyers/login')
      .set('Accept', appJSON)
      .send(userLogin)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', expect.any(Number));
        expect(response.body).toHaveProperty('firstName');
        expect(response.body).toHaveProperty('lastName');
        expect(response.body).toHaveProperty('picture');
        expect(response.body).toHaveProperty('role');
        expect(response.body).toHaveProperty('access_token');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('POST /buyers/login [fail] [401]', () => {
  test('Should return {message: "Invalid email or password"} [401]', (done) => {
    request(app)
      .post('/buyers/login')
      .set('Accept', appJSON)
      .send(userLoginErrEmail)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty(
          'message',
          'Invalid Email or Password'
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Should return {message: "Invalid email or password"} [401]', (done) => {
    request(app)
      .post('/buyers/login')
      .set('Accept', appJSON)
      .send(userLoginErrPass)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty(
          'message',
          'Invalid Email or Password'
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

// Test Seller

describe('POST /sellers/register [success]', () => {
  test('Should return {id, email} [201]', (done) => {
    request(app)
      .post('/sellers/register')
      .set('Accept', appJSON)
      .send(seller)
      .then((response) => {
        expect(response.status).toBe(201); // BUG
        expect(response.body).toHaveProperty('id', expect.any(Number));
        expect(response.body).toHaveProperty('email');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('POST /sellers/register [fail]', () => {
  test('Should return {message: "Email already exists"} [400]', (done) => {
    request(app)
      .post('/sellers/register')
      .set('Accept', appJSON)
      .send(seller)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Email already exists');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Should return {message: "Invalid email format"} [400]', (done) => {
    request(app)
      .post('/sellers/register')
      .set('Accept', appJSON)
      .send(sellerInvalidEmail)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({ message: 'Invalid email format' })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Should return {message: "Email cannot be empty, Invalid email format"} [400]', (done) => {
    request(app)
      .post('/sellers/register')
      .set('Accept', appJSON)
      .send(sellerEmptyEmail)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'Email cannot be empty, Invalid email format',
          })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Should return {message: "First name cannot be empty"} [400]', (done) => {
    request(app)
      .post('/sellers/register')
      .set('Accept', appJSON)
      .send(sellerErrName)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({ message: 'First name cannot be empty' })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Should return {message: "Phone number cannot be empty} [400]', (done) => {
    request(app)
      .post('/sellers/register')
      .set('Accept', appJSON)
      .send(sellerErrPhone)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({ message: 'Phone number cannot be empty' })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Should return {message: "Password cannot be empty"} [400]', (done) => {
    request(app)
      .post('/sellers/register')
      .set('Accept', appJSON)
      .send(sellerErrPass)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({ message: 'Password cannot be empty' })
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('POST /sellers/login [success]', () => {
  test('Should return {id, firstName, lastName, picture, role, access_token} [200]', (done) => {
    request(app)
      .post('/sellers/login')
      .set('Accept', appJSON)
      .send(sellerLogin)
      .then((response) => {
        expect(response.status).toBe(200); // BUG
        expect(response.body).toHaveProperty('id', expect.any(Number));
        expect(response.body).toHaveProperty('firstName');
        expect(response.body).toHaveProperty('lastName');
        expect(response.body).toHaveProperty('picture');
        expect(response.body).toHaveProperty('role');
        expect(response.body).toHaveProperty('access_token');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('POST /sellers/login [fail] [401]', () => {
  test('Should return {message: "Invalid email or password"} [401]', (done) => {
    request(app)
      .post('/sellers/login')
      .set('Accept', appJSON)
      .send(sellerLoginErrEmail)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty(
          'message',
          'Invalid Email or Password'
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Should return {message: "Invalid email or password"} [401]', (done) => {
    request(app)
      .post('/sellers/login')
      .set('Accept', appJSON)
      .send(sellerLoginErrPass)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty(
          'message',
          'Invalid Email or Password'
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
