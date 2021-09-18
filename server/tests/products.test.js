const app = require('../app');
const {
  User,
  Product,
  UsersProduct,
  Category,
  Brand,
  ProductsBrand,
} = require('../models');
const request = require('supertest');
const { checkPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

const appJSON = 'application/json';

const firstName = 'firstName';
const lastName = 'lastName';
const phoneNumber = '123';
const picture = 'picture';
const password = 'password';

const categories = [
  {
    name: 'Skincare',
  },
  {
    name: 'Cosmetic',
  },
  {
    name: 'Sanitary',
  },
  {
    name: 'Hygiene',
  },
];

const sellerCreator = {
  id: 1,
  firstName,
  lastName,
  email: 'seller@mail.com',
  phoneNumber,
  picture,
  role: 'seller',
  password,
};
const buyerCreator = {
  id: 1,
  firstName,
  lastName,
  email: 'buyer@mail.com',
  phoneNumber,
  picture,
  role: 'buyer',
  password,
};

const name = 'name';
const price = 123;
const stock = 2;
const weight = 2.4;
const status = 'eco';
const description = 'description';
const ingridient = ['a', 'b'];
const UserId = 1;
// const picture = 'picture';
const CategoryId = 1;
const brand = 'brandName';

const emptyName = '';
const emptyPrice = '';
const emptyStock = '';
const emptyWeight = 0;
const emptyStatus = '';
const emptyDescription = '';
const emptyIngridient = [];
const emptyUserId = 0;
const emptyPicture = '';
const emptyCategoryId = 0;
const emptyBrand = '';

const productSuccess = {
  name,
  price,
  stock,
  weight,
  status,
  description,
  ingridient,
  UserId,
  picture,
  CategoryId,
};
const productEmptyName = {
  name: emptyName,
  price,
  stock,
  weight,
  status,
  description,
  ingridient,
  UserId,
  picture,
  CategoryId,
};
const productEmptyPrice = {
  name,
  price: emptyPrice,
  stock,
  weight,
  status,
  description,
  ingridient,
  UserId,
  picture,
  CategoryId,
};
const productEmptyStock = {
  name,
  price,
  stock: emptyStock,
  weight,
  status,
  description,
  ingridient,
  UserId,
  picture,
  CategoryId,
};
const productEmptyWeight = {
  name,
  price,
  stock,
  weight: emptyWeight,
  status,
  description,
  ingridient,
  UserId,
  picture,
  CategoryId,
};
const productEmptyStatus = {
  name,
  price,
  stock,
  weight,
  status: emptyStatus,
  description,
  ingridient,
  UserId,
  picture,
  CategoryId,
};
const productEmptyDescription = {
  name,
  price,
  stock,
  weight,
  status,
  description: emptyDescription,
  ingridient,
  UserId,
  picture,
  CategoryId,
};
const productEmptyIngridient = {
  name,
  price,
  stock,
  weight,
  status,
  description,
  ingridient: emptyIngridient,
  UserId,
  picture,
  CategoryId,
};
const productEmptyUserId = {
  name,
  price,
  stock,
  weight,
  status,
  description,
  ingridient,
  UserId: emptyUserId,
  picture,
  CategoryId,
};
const productEmptyPicture = {
  name,
  price,
  stock,
  weight,
  status,
  description,
  ingridient,
  UserId,
  picture: emptyPicture,
  CategoryId,
};
const productEmptyBrand = {
  name,
  price,
  stock,
  weight,
  status,
  description,
  ingridient,
  UserId,
  picture,
  CategoryId,
  brand,
};
const productEmptyCategoryId = {
  name,
  price,
  stock,
  weight,
  status,
  description,
  ingridient,
  UserId,
  picture,
  CategoryId: emptyCategoryId,
};

// const ProductId =

// const usersProductSuccess = {
//   ProductId,
//   BrandId
// }

let brands = [];
let sellerHashedPassword = '';
let sellerToken = '';

beforeAll((done) => {
  // Promise.all([
  Category.bulkCreate(categories)
    .then((categories) => {
      // console.log(categories.body, 'CATEGORI');
      done();
    })
    .catch((err) => done(err));

  User.create(sellerCreator)
    .then((user) => {
      // console.log(user, 'USER CREATED');
      hashedSellerPassword = user.password;
      // done();
      User.findOne({
        where: {
          email: sellerCreator.email,
          password: hashedSellerPassword,
        },
      })
        .then((user) => {
          // console.log(user, 'USER LOGIN');
          sellerToken = signToken({
            id: user.id,
            email: user.email,
            role: user.role,
          });

          done();
        })
        .catch((err) => done(err));
    })
    .catch((err) => done(err));

  Product.create(
    {
      ...productSuccess,
      Brands: { name: brand },
    },
    {
      include: [Brand],
    }
  )
    .then((product) => {
      // console.log(product, 'PRODUCT CREATED');
      // console.log(sellerCreator);
      UsersProduct.create({
        ProductId: product.id,
        UserId: sellerCreator.id,
        status: 'apa hayo',
      })
        .then((userProduct) => {
          // console.log(userProduct, 'USERPRODUCT');
          done();
        })
        .catch((err) => done(err));
    })
    .catch((err) => done(err));
  // Brand.findOne({where: {}})
  // ])
  // .then(() => {
  //   done();
  // })
  // .catch((err) => done(err));
});

afterAll((done) => {
  Promise.all([
    User.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    })
      .then(() => {
        done();
      })
      .catch((err) => done(err)),
    Category.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    })
      .then(() => {
        done();
      })
      .catch((err) => done(err)),
  ]);
});

// Test sellers/products THIS

describe('POST /sellers/products [success]', () => {
  test('Should return {message: Successfully added product} [201]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productSuccess)
      .then((response) => {
        console.log(response.body, 'HLO');
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', expect.any(String));
        done();
      })
      .catch((err) => done(err));
  });
});
/*
describe('GET /sellers/products [success]', () => {
  test('Should return {id, name, price, stock, weight, status, description, ingridient, picture, Category, Brands} [200]', (done) => {
    request(app)
      .get('/sellers/products')
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              price: expect.any(Number),
              stock: expect.any(Number),
              weight: expect.any(Number),
              status: expect.any(String),
              description: expect.any(String),
              ingridient: expect.arrayContaining([]),
              picture: expect.any(String),
              Category: expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
              }),
              Brand: expect.arrayContaining([
                expect.objectContaining({
                  id: expect.any(Number),
                  ProductId: expect.any(Number),
                  BrandId: expect.any(Number),
                }),
              ]),
            }),
          ])
        );
      });
  });
});

describe('GET /sellers/product/:id [success]', () => {
  test('Should return {id, name, price, stock, weight, status, description, ingridient, picture, Category, Brands} [200]', (done) => {
    request(app)
      .get(`/sellers/product/${sellerCreator.id}`)
      .set('access_token', sellerToken)
      .set('Accept', appJSON)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number),
            stock: expect.any(Number),
            weight: expect.any(Number),
            status: expect.any(String),
            description: expect.any(String),
            ingridient: expect.arrayContaining([]),
            picture: expect.any(String),
            Category: expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
            }),
            Brand: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                ProductId: expect.any(Number),
                BrandId: expect.any(Number),
              }),
            ]),
          })
        );
      });
  });
});
*/
// Test buyers/products THIS
