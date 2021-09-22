const app = require('../app');
const { User, Product, UsersProduct, Category, Brand } = require('../models');
const request = require('supertest');
const { signToken } = require('../helpers/jwt');

const appJSON = 'application/json';
const formData = 'multipart/form-data';

const image = `${__dirname}/cover.png`;
const ingredients = `${__dirname}/eco.jpg`;
const reject = `${__dirname}/reject.jpg`;
const notImageFormat = `${__dirname}/notImageFormat`;

const name = 'name';
const price = 123;
const weight = 2.4;
const stock = 2;
const description = 'description';
const CategoryId = 1;
const brand = 'brandName';

const status = '0';
const ingridient = ['a', 'b'];
const harmfulIngridient = ['a'];
const picture = 'picture';
// const UserId = 1

const productSuccess = {
  name,
  price,
  weight,
  stock,
  description,
  CategoryId,
};
const productEmptyName = {
  name: '',
  price,
  weight,
  stock,
  description,
  CategoryId,
};
const productEmptyPrice = {
  name,
  price: '',
  weight,
  stock,
  description,
  CategoryId,
};
const productEmptyWeight = {
  name,
  price,
  weight: '',
  stock,
  description,
  CategoryId,
};
const productEmptyStock = {
  name,
  price,
  weight,
  stock: '',
  description,
  CategoryId,
};
const productEmptyDescription = {
  name,
  price,
  weight,
  stock,
  description: '',
  CategoryId,
};
const productEmptyCategoryId = {
  name,
  price,
  weight,
  stock,
  description,
  CategoryId: '',
};

const sellerCreator = {
  firstName: 'sel',
  lastName: 'ler',
  email: 'seller@mail.com',
  phoneNumber: 234,
  picture: 'pictureSeller',
  role: 'seller',
  password: 'sellerPassword',
};

const buyerCreator = {
  firstName: 'buy',
  lastName: 'er',
  email: 'buyer@mail.com',
  phoneNumber: 123,
  picture: 'pictureBuyer',
  role: 'buyer',
  password: 'buyerPassword',
};

let buyerToken = '';
let sellerToken = '';
let sellerId = 0;
let categoryId = 0;
let productId = 0;
const notFoundProductId = 10;

beforeAll(async () => {
  const category = await Category.create({ name: 'category name' });
  categoryId = category.id;

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

  const product = await Product.create(
    {
      name,
      price,
      stock,
      weight,
      status,
      description,
      harmfulIngridient,
      ingridient,
      UserId: seller.id,
      picture,
      CategoryId: category.id,
      Brands: { name: brand },
    },
    { include: [Brand] }
  );
  productId = product.id;

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

describe('POST /sellers/products [success]', () => {
  test('Should return {message: Successfully added product} [201]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Content-Type', formData)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .attach('ingredients', ingredients)
      .attach('image', image)
      .field('name', name)
      .field('price', price)
      .field('weight', weight)
      .field('stock', stock)
      .field('description', description)
      .field('CategoryId', categoryId)
      .field('brand', brand)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty(
          'message',
          'Successfully added product'
        );
        done();
      })
      .catch((err) => done(err));
  });
});

describe('POST /sellers/products [failed]', () => {
  test(`Should return {message: You are not authorized!} [401]`, (done) => {
    request(app)
      .post('/sellers/products')
      .set('Content-Type', formData)
      .set('Accept', appJSON)
      .attach('ingredients', ingredients)
      .attach('image', image)
      .field('name', name)
      .field('price', price)
      .field('weight', weight)
      .field('stock', stock)
      .field('description', description)
      .field('CategoryId', categoryId)
      .field('brand', brand)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'You are not authorized!',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test(`Should return {message: You don't have an access to do this!} [403]`, (done) => {
    request(app)
      .post('/sellers/products')
      .set('Content-Type', formData)
      .set('Accept', appJSON)
      .set('access_token', buyerToken)
      .attach('ingredients', ingredients)
      .attach('image', image)
      .field('name', name)
      .field('price', price)
      .field('weight', weight)
      .field('stock', stock)
      .field('description', description)
      .field('CategoryId', categoryId)
      .field('brand', brand)
      .then((response) => {
        expect(response.status).toBe(403);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: `You don't have an access to do this!`,
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test(`Should return {message: File is not an image} [400]`, (done) => {
    request(app)
      .post('/sellers/products')
      .set('Content-Type', formData)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .attach('ingredients', notImageFormat)
      .attach('image', notImageFormat)
      .field('name', name)
      .field('price', price)
      .field('weight', weight)
      .field('stock', stock)
      .field('description', description)
      .field('CategoryId', categoryId)
      .field('brand', brand)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: `File is not an image`,
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test(`Should return {message: Uploaded picture didn't contain ingridients} [400]`, (done) => {
    request(app)
      .post('/sellers/products')
      .set('Content-Type', formData)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .attach('ingredients', image)
      .attach('image', image)
      .field('name', name)
      .field('price', price)
      .field('weight', weight)
      .field('stock', stock)
      .field('description', description)
      .field('CategoryId', categoryId)
      .field('brand', brand)
      .then((response) => {
        console.log(response.body);
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: `Uploaded picture didn't contain ingridients`,
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  // BUG
  test(`Should return {message: Rejected! Eco-mmerce can not tolerate your dangerous product} [400]`, (done) => {
    request(app)
      .post('/sellers/products')
      .set('Content-Type', formData)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .attach('ingredients', reject)
      .attach('image', image)
      .field('name', name)
      .field('price', price)
      .field('weight', weight)
      .field('stock', stock)
      .field('description', description)
      .field('CategoryId', categoryId)
      .field('brand', brand)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: `Rejected! Eco-mmerce can not tolerate your dangerous product`,
          })
        );
        done();
      })
      .catch((err) => done(err));
  });
  // });

  test('Should return {message: Product.picture cannot be null} [400]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Content-Type', formData)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .attach('ingredients', ingredients)
      .attach('image', '')
      .field('name', name)
      .field('price', price)
      .field('weight', weight)
      .field('stock', stock)
      .field('description', description)
      .field('CategoryId', categoryId)
      .field('brand', brand)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'Product.picture cannot be null',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return {message: Name cannot be empty} [400]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Content-Type', formData)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .attach('ingredients', ingredients)
      .attach('image', image)
      .field('name', '')
      .field('price', price)
      .field('weight', weight)
      .field('stock', stock)
      .field('description', description)
      .field('CategoryId', categoryId)
      .field('brand', brand)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'Name cannot be empty',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return {message: Price cannot be empty} [400]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Content-Type', formData)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .attach('ingredients', ingredients)
      .attach('image', image)
      .field('name', name)
      .field('price', '')
      .field('weight', weight)
      .field('stock', stock)
      .field('description', description)
      .field('CategoryId', categoryId)
      .field('brand', brand)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'Price cannot be empty',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return {message: Stock cannot be empty} [400]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Content-Type', formData)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .attach('ingredients', ingredients)
      .attach('image', image)
      .field('name', name)
      .field('price', price)
      .field('weight', weight)
      .field('stock', '')
      .field('description', description)
      .field('CategoryId', categoryId)
      .field('brand', brand)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'Stock cannot be empty',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return {message: Weight cannot be empty} [400]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Content-Type', formData)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .attach('ingredients', ingredients)
      .attach('image', image)
      .field('name', name)
      .field('price', price)
      .field('weight', '')
      .field('stock', stock)
      .field('description', description)
      .field('CategoryId', categoryId)
      .field('brand', brand)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'Weight cannot be empty',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return {message: Description cannot be empty} [400]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Content-Type', formData)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .attach('ingredients', ingredients)
      .attach('image', image)
      .field('name', name)
      .field('price', price)
      .field('weight', weight)
      .field('stock', stock)
      .field('description', '')
      .field('CategoryId', categoryId)
      .field('brand', brand)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'Description cannot be empty',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return {message: Category cannot be empty} [400]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Content-Type', formData)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .attach('ingredients', ingredients)
      .attach('image', image)
      .field('name', name)
      .field('price', price)
      .field('weight', weight)
      .field('stock', stock)
      .field('description', description)
      .field('CategoryId', '')
      .field('brand', brand)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'Category cannot be empty',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return {message: Brand name cannot be empty} [400]', (done) => {
    request(app)
      .post('/sellers/products')
      .set('Content-Type', formData)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .attach('ingredients', ingredients)
      .attach('image', image)
      .field('name', name)
      .field('price', price)
      .field('weight', weight)
      .field('stock', stock)
      .field('description', description)
      .field('CategoryId', categoryId)
      .field('brand', '')
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'Brand name cannot be empty',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });
});

describe('UPDATE /sellers/products/:id [success]', () => {
  test('Should return {message: Product has been successfully updated!} [200]', (done) => {
    request(app)
      .put(`/sellers/products/${productId}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productSuccess)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'Product has been successfully updated!',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });
});

describe('UPDATE /sellers/products/:id [failed]', () => {
  test(`Should return {message: You are not authorized!} [401]`, (done) => {
    request(app)
      .get(`/sellers/products/${productId}`)
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

  test(`Should return {message: You don't have an access to do this!} [403]`, (done) => {
    request(app)
      .post(`/sellers/products/${productId}`)
      .set('Content-Type', formData)
      .set('Accept', appJSON)
      .set('access_token', buyerToken)
      .attach('ingredients', ingredients)
      .attach('image', image)
      .field('name', name)
      .field('price', price)
      .field('weight', weight)
      .field('stock', stock)
      .field('description', description)
      .field('CategoryId', categoryId)
      .field('brand', brand)
      .then((response) => {
        expect(response.status).toBe(403);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: `You don't have an access to do this!`,
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return {message: Product is not found!} [404]', (done) => {
    request(app)
      .put(`/sellers/products/${notFoundProductId}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productSuccess)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: `Product is not found!`,
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return {message: Name cannot be empty} [400]', (done) => {
    request(app)
      .put(`/sellers/products/${productId}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyName)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'Name cannot be empty',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return {message: Price cannot be empty} [400]', (done) => {
    request(app)
      .put(`/sellers/products/${productId}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyPrice)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'Price cannot be empty',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return {message: Stock cannot be empty} [400]', (done) => {
    request(app)
      .put(`/sellers/products/${productId}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyStock)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'Stock cannot be empty',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return {message: Weight cannot be empty} [400]', (done) => {
    request(app)
      .put(`/sellers/products/${productId}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyWeight)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'Weight cannot be empty',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return {message: Description cannot be empty} [400]', (done) => {
    request(app)
      .put(`/sellers/products/${productId}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyDescription)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'Description cannot be empty',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return {message: Category cannot be empty} [400]', (done) => {
    request(app)
      .put(`/sellers/products/${productId}`)
      .set('Accept', appJSON)
      .set('access_token', sellerToken)
      .send(productEmptyCategoryId)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'Category cannot be empty',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });
});

describe('GET /sellers/products [success]', () => {
  test('Should return [{id, name, price, stock, picture, Category, Brands}] [200]', (done) => {
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
        done();
      })
      .catch((err) => done(err));
  });
});

describe('GET /sellers/products [failed]', () => {
  test('Should return {message: You are not authorized!} [401]', (done) => {
    request(app)
      .get('/sellers/products')
      .set('Accept', appJSON)
      .then((response) => {
        expect(response.status).toBe(401);
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
      .get(`/sellers/products/${productId}`)
      .set('access_token', sellerToken)
      .set('Accept', appJSON)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            id: productId,
            name: expect.any(String),
            price: expect.any(Number),
            stock: expect.any(Number),
            weight: expect.any(Number),
            status: expect.any(String),
            description: expect.any(String),
            ingridient: expect.arrayContaining([expect.any(String)]),
            harmfulIngridient: expect.arrayContaining([expect.any(String)]),
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
      .get(`/sellers/products/${productId}`)
      .set('Accept', appJSON)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: 'You are not authorized!',
          })
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('Should return {message: Product is not found!} [404]', (done) => {
    request(app)
      .get(`/sellers/products/${notFoundProductId}`)
      .set('access_token', sellerToken)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: `Product is not found!`,
          })
        );
        done();
      })
      .catch((err) => done(err));
  });
});

describe('DELETE /sellers/products/:id [success]', () => {
  test('Should return {message: Product has been successfully deleted!} [200]', (done) => {
    request(app)
      .delete(`/sellers/products/${productId}`)
      .set('access_token', sellerToken)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: `Product has been successfully deleted!`,
          })
        );
        done();
      })
      .catch((err) => done(err));
  });
});

describe('DELETE /sellers/products/:id [failed]', () => {
  test('Should return {message: You are not authorized!} [401]', (done) => {
    request(app)
      .delete(`/sellers/products/${productId}`)
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

  test('Should return {message: Product is not found!} [404]', (done) => {
    request(app)
      .delete(`/sellers/products/${notFoundProductId}`)
      .set('access_token', sellerToken)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: `Product is not found!`,
          })
        );
        done();
      })
      .catch((err) => done(err));
  });
});
