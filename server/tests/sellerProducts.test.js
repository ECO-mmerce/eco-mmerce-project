const app = require('../app');
const { User, Product, UsersProduct, Category, Brand } = require('../models');
const request = require('supertest');
const { signToken } = require('../helpers/jwt');

const appJSON = 'application/json';

const categoryCreator = {
  name: 'Skincare',
};

const firstName = 'firstName';
const lastName = 'lastName';
const phoneNumber = '123';
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
const sellerCreator2 = {
  firstName,
  lastName,
  email: 'seller2@mail.com',
  phoneNumber,
  picture,
  role: 'seller2',
  password,
};

const name = 'name';
const price = 123;
const stock = 2;
const weight = 2.4;
const status = 'eco';
const description = 'description';
const ingridient = ['a', 'b'];
const UserId = ''; // ambil dari beforeAll
// const picture = 'picture'; // ambil dari user creator
const CategoryId = 1;
const harmfulIngridient = ['a'];
const brand = 'brandName';

const emptyName = '';
const emptyPrice = '';
const emptyStock = '';
const emptyWeight = '';
const emptyStatus = '';
const emptyDescription = '';
const emptyIngridient = [];
// const emptyUserId = ''; // no need, auth sudah di handle di users.test.js
const emptyPicture = '';
const emptyCategoryId = '';
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
  harmfulIngridient,
  brand,
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
  harmfulIngridient,
  brand,
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
  harmfulIngridient,
  brand,
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
  harmfulIngridient,
  brand,
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
  harmfulIngridient,
  brand,
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
  harmfulIngridient,
  brand,
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
  harmfulIngridient,
  brand,
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
  harmfulIngridient,
  brand,
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
  harmfulIngridient,
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
  harmfulIngridient,
  brand,
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
  harmfulIngridient,
  brand: emptyBrand,
};

let sellerToken = '';
let sellerToken2 = '';
let sellerId = '';
let sellerId2 = '';
let productData = {};
const notFoundProductId = 10;

beforeAll(async () => {
  const category = await Category.create(categoryCreator);

  const seller = await User.create(sellerCreator);
  sellerId = seller.id;
  sellerToken = signToken({
    id: seller.id,
    email: seller.email,
    role: seller.role,
  });

  const seller2 = await User.create(sellerCreator2);
  sellerId2 = seller2.id;
  sellerToken2 = signToken({
    id: seller2.id,
    email: seller2.email,
    role: seller2.role,
  });

  const product = await Product.create(
    {
      name,
      price,
      stock,
      weight,
      status,
      description,
      ingridient,
      UserId: seller.id,
      picture,
      CategoryId: category.id,
      harmfulIngridient,
      Brands: { name: brand },
    },
    { include: [Brand] }
  );
  productData.id = product.id;

  await UsersProduct.create({
    ProductId: product.id,
    UserId: seller.id,
  });
});

afterAll(async () => {
  await Category.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Product.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await UsersProduct.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

// Test sellers/products THIS

describe('POST /sellers/products [success]', () => {
  test('Should return [{message: Successfully added product}] [201]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productSuccess)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', expect.any(String));
        done();
      })
      .catch((err) => done(err));
  });
});

describe('POST /sellers/products [failed]', () => {
  test('Should return [{message: Name cannot be empty}] [400]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyName)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Name cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: Price cannot be empty}] [400]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyPrice)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Price cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: Stock cannot be empty}] [400]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyStock)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Stock cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: Weight cannot be empty}] [400]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyWeight)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Weight cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: Status cannot be empty}] [400]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyStatus)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Status cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: Description cannot be empty}] [400]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyDescription)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Description cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: Ingridient cannot be empty}] [400]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyIngridient)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Ingridient cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: Picture cannot be empty}] [400]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyPicture)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Picture cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: CategoryId cannot be empty}] [400]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyCategoryId)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'CategoryId cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: Brand name cannot be empty}] [400]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyBrand)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Brand name cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });
});

describe('UPDATE /sellers/products/:id [success]', () => {
  test('Should return [{message: Product with ID ${id} has been successfully updated!}] [200]', (done) => {
    request(app)
      .put(`/sellers/products/${productData.id}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productSuccess)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', expect.any(String));
        done();
      })
      .catch((err) => done(err));
  });
});

describe('UPDATE /sellers/products/:id [failed]', () => {
  test(`Should return {message: You are not authorized!} [401]`, (done) => {
    request(app)
      .get(`/sellers/products/${productData.id}`)
      .set('Accept', appJSON)
      .send(productSuccess)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: `You are not authorized!`,
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return {message: Product with ID ${id} is not found!} [404]', (done) => {
    request(app)
      .put(`/sellers/products/${notFoundProductId}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productSuccess)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: `Product with ID ${notFoundProductId} is not found!`,
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: Name cannot be empty}] [400]', (done) => {
    request(app)
      .put(`/sellers/products/${productData.id}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyName)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Name cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: Price cannot be empty}] [400]', (done) => {
    request(app)
      .put(`/sellers/products/${productData.id}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyPrice)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Price cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: Stock cannot be empty}] [400]', (done) => {
    request(app)
      .put(`/sellers/products/${productData.id}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyStock)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Stock cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: Weight cannot be empty}] [400]', (done) => {
    request(app)
      .put(`/sellers/products/${productData.id}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyWeight)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Weight cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: Status cannot be empty}] [400]', (done) => {
    request(app)
      .put(`/sellers/products/${productData.id}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyStatus)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Status cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: Description cannot be empty}] [400]', (done) => {
    request(app)
      .put(`/sellers/products/${productData.id}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyDescription)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Description cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: Ingridient cannot be empty}] [400]', (done) => {
    request(app)
      .put(`/sellers/products/${productData.id}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyIngridient)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Ingridient cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: Picture cannot be empty}] [400]', (done) => {
    request(app)
      .put(`/sellers/products/${productData.id}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyPicture)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Picture cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: CategoryId cannot be empty}] [400]', (done) => {
    request(app)
      .put(`/sellers/products/${productData.id}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyCategoryId)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'CategoryId cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return [{message: Brand name cannot be empty}] [400]', (done) => {
    request(app)
      .put(`/sellers/products/${productData.id}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyBrand)
      .then((response) => {
        expect(response.status).toBe(400);
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Brand name cannot be empty',
          }),
        ]);
        done();
      })
      .catch((err) => done(err));
  });
});

describe('GET /sellers/products [success]', () => {
  test('Should return {id, name, price, stock, picture, Category, Brands} [200]', (done) => {
    request(app)
      .get('/sellers/products')
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              price: expect.any(Number),
              stock: expect.any(Number),
              picture: expect.any(String),
              Category: expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
              }),
              Brands: expect.arrayContaining([
                expect.objectContaining({
                  id: expect.any(Number),
                  name: expect.any(String),
                }),
              ]),
            }),
          ])
        );
      });
  });
});
describe('GET /sellers/products [failed]', () => {
  test('Should return {message: You are not authorized!} [401]', (done) => {
    request(app)
      .get('/sellers/products')
      .set('Accept', appJSON)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'You are not authorized!',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });
});

describe('GET /sellers/products/:id [success]', () => {
  test('Should return {id, name, price, stock, weight, status, description, ingridient, picture, UserId, Category, Brands} [200]', (done) => {
    request(app)
      .get(`/sellers/products/${productData.id}`)
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
            ingridient: expect.arrayContaining([expect.any(String)]),
            picture: expect.any(String),
            UserId: sellerId,
            Category: expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
            }),
            Brands: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
              }),
            ]),
          })
        );
        done();
      })
      .catch((err) => done(err));
  });
});
describe('GET /sellers/products/:id [failed]', () => {
  test('Should return {message: You are not authorized!} [401]', (done) => {
    request(app)
      .get(`/sellers/products/${productData.id}`)
      .set('Accept', appJSON)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'You are not authorized!',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return {message: Product with ID ${id} is not found!} [404]', (done) => {
    request(app)
      .get(`/sellers/products/${notFoundProductId}`)
      .set('access_token', sellerToken)
      .then((response) => {
        console.log(response.body, '<<<<<<<<<<<<<<<<<<<<<<<');
        expect(response.status).toBe(404);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: `Product with ID ${notFoundProductId} is not found!`,
          })
        );
      });
  });
});

describe('DELETE /sellers/products/:id [success]', () => {
  test('Should return {message: Product with ID ${id} has been successfully deleted!} [200]', (done) => {
    request(app)
      .delete(`/sellers/products/${productData.id}`)
      .set('access_token', sellerToken)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: `Product with ID ${productData.id} has been successfully deleted!`,
          })
        );
      });
  });
});
describe('DELETE /sellers/products/:id [failed]', () => {
  test('Should return {message: You are not authorized!} [401]', (done) => {
    request(app)
      .delete(`/sellers/products/${productData.id}`)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: `You are not authorized!`,
          })
        );
      });
  });

  test('Should return {message: Product with ID ${id} is not found!} [404]', (done) => {
    request(app)
      .delete(`/sellers/products/${notFoundProductId}`)
      .set('access_token', sellerToken)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: `Product with ID ${notFoundProductId} is not found!`,
          })
        );
      });
  });
});

// Test buyers/products THIS
