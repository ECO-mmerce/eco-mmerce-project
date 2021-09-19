const { OAuth2Client } = require(`google-auth-library`);

const { signToken } = require('../helpers/jwt');
const { checkPassword } = require('../helpers/bcrypt');
const {
  Product,
  User,
  Brand,
  Category,
  Cart,
  UsersProduct,
  History,
} = require('../models');
const _ = require('lodash');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class BuyerController {
  static async loginBuyer(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      if (user) {
        if (checkPassword(password, user.password)) {
          const access_token = signToken({
            id: user.id,
            email: user.email,
            role: user.role,
          });

          res.status(200).json({
            access_token,
            id: user.id,
            role: user.role,
            picture: user.picture,
            firstName: user.firstName,
            lastName: user.lastName,
          });
        } else {
          throw { name: 'Unauthorized', message: 'Invalid Email or Password' };
        }
      } else {
        throw { name: 'Unauthorized', message: 'Invalid Email or Password' };
      }
    } catch (err) {
      next(err);
    }
  }

  static async googleLoginBuyer(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      let payload = ticket.getPayload();

      console.log(payload, `INI PAYLOAD`);

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          firstName: payload.given_name,
          lastName: payload.name,
          phoneNumber: 'unknown',
          picture: payload.picture,
          password: payload.email,
          role: 'buyer',
        },
      });
      const access_token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      res.status(201).json({
        access_token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        picture: user.picture,
      });
    } catch (err) {
      next(err);
    }
  }

  static async registerBuyer(req, res, next) {
    try {
      const { firstName, lastName, email, password, phoneNumber } = req.body;
      const picture =
        req.imgUrl ||
        'https://ik.imagekit.io/imgmarc/default-profile_4m4ooSMXJ.png?updatedAt=1629741970508';

      const newBuyer = await User.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        picture,
        role: 'buyer',
      });

      res.status(201).json({ id: newBuyer.id, email: newBuyer.email });
    } catch (err) {
      next(err);
    }
  }

  static async getProducts(req, res, next) {
    try {
      const { brand, categoryId: CategoryId } = req.query;
      const filterBrand = brand ? { name: brand } : {};
      const filterCategory = CategoryId ? { id: CategoryId } : {};
      const products = await Product.findAll({
        order: [['id', 'ASC']],
        include: [
          {
            model: UsersProduct,
            attributes: {
              exclude: [
                'ProductId',
                'UserId',
                // 'status',
                'createdAt',
                'updatedAt',
              ],
            },
            include: [
              {
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'role'],
              },
            ],
          },
          {
            model: Category,
            where: filterCategory,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
          {
            model: Brand,
            where: filterBrand,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            through: {
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'ProductId', 'BrandId'],
              },
            },
          },
        ],
        attributes: {
          exclude: [
            'weight',
            'status',
            'description',
            'ingridient',
            'CategoryId',
            'UserId',
            'createdAt',
            'updatedAt',
          ],
        },
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async getProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: { id },
        include: [
          {
            model: UsersProduct,
            attributes: {
              exclude: [
                // 'ProductId',
                'UserId',
                // 'status',
                'createdAt',
                'updatedAt',
              ],
            },
            include: [
              {
                model: User, // seller
                attributes: ['id', 'firstName', 'lastName', 'role'],
              },
            ],
          },
          {
            model: Category,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
          {
            model: Brand,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            through: {
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'ProductId', 'BrandId'],
              },
            },
          },
        ],
        attributes: {
          exclude: ['UserId', 'CategoryId', 'createdAt', 'updatedAt'],
        },
      });

      if (product === null) {
        throw { name: 'Not Found', message: 'ID not found !' };
      } else {
        res.status(200).json(product);
      }
    } catch (err) {
      next(err);
    }
  }

  static async getCarts(req, res, next) {
    try {
      const carts = await Cart.findAll({
        where: { UserId: req.user.id },
        order: [['createdAt', 'ASC']], //buyer
        attributes: {
          exclude: ['ProductId', 'UserId', 'createdAt', 'updatedAt'],
        },
        raw: true,
        nest: true,
        include: [
          {
            model: Product,
            attributes: [
              'id',
              'name',
              'stock',
              'price',
              'weight',
              'status',
              'picture',
            ],
            include: [
              {
                model: UsersProduct,
                attributes: {
                  exclude: ['ProductId', 'UserId', 'createdAt', 'updatedAt'],
                },
                include: [
                  {
                    model: User, // seller
                    attributes: {
                      exclude: [
                        'role',
                        'email',
                        'phoneNumber',
                        'picture',
                        'password',
                        'createdAt',
                        'updatedAt',
                      ],
                    },
                  },
                ],
              },
            ],
          },
        ],
      });

      const newCarts = JSON.parse(JSON.stringify(carts));
      let test = [];
      for (let key in newCarts) {
        let count = 0;
        let currentId = newCarts[key].Product.id;
        for (let key2 in newCarts) {
          if (newCarts[key2].Product.id === currentId) count++;
        }
        test.push(newCarts[key]);
        newCarts[key].Product.qty = count;
      }

      const uniqueCarts = _.uniqWith(newCarts, _.isEqual);

      res.status(200).json(uniqueCarts);
    } catch (err) {
      next(err);
    }
  }

  static async createCart(req, res, next) {
    try {
      const { id: UserId } = req.user;
      const { ProductId } = req.body;
      await Cart.create({
        UserId,
        ProductId,
      });

      res.status(201).json({ message: 'Product is added to cart' });
    } catch (err) {
      next(err);
    }
  }

  static async removeQty(req, res, next) {
    try {
      const { id: UserId } = req.user;
      const { id: ProductId } = req.params;

      const { id: deletedCart } = await Cart.findOne({
        where: { UserId, ProductId },
        attributes: ['id'],
      });

      const data = await Cart.destroy({
        where: { id: deletedCart },
      });

      if (data === 0) {
        throw { name: 'Not Found', message: 'ID not found !' };
      } else {
        res
          .status(200)
          .json({ message: 'Product has been removed from the cart' });
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const { id: UserId } = req.user;
      const { ProductId } = req.body;

      const data = await Cart.destroy({
        where: { UserId, ProductId },
      });

      if (data === 0) {
        throw { name: 'Not Found', message: 'ID not found' };
      } else {
        res.status(200).json({ message: 'Deleted From your cart' });
      }
    } catch (err) {
      next(err);
    }
  }

  static async checkOut(req, res, next) {
    try {
      const { id: UserId } = req.user;

      const currentCart = await Cart.findAll({
        where: { UserId },
        attributes: ['ProductId', 'UserId'],
      });

      await currentCart.forEach((el) => {
        History.create({
          ProductId: el.ProductId,
          UserId: el.UserId,
        });
      });

      const checkedOut = await Cart.destroy({ where: { UserId } });
      if (checkedOut === 0) {
        throw {
          name: 'Bad Request',
          message: "You don't have any products in your cart.",
        };
      } else {
        res.status(200).json({ message: 'Checkout successfully!' });
      }
    } catch (err) {
      next(err);
    }
  }

  static async getHistory(req, res, next) {
    try {
      const { id: UserId } = req.user;
      const seeHistory = await History.findAll({
        where: { UserId },
        attributes: ['ProductId', 'UserId', 'createdAt'],
        include: [
          {
            model: Product,
            attributes: ['name', 'picture', 'price'],
            include: {
              model: Category,
              attributes: ['name'],
            },
          },
          {
            model: User,
            attributes: ['firstName', 'lastName'],
          },
        ],
      });

      res.status(200).json(seeHistory);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BuyerController;
