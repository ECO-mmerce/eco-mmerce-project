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
} = require('../models');

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
            firstname: user.firstName,
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

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          firstName: payload.given_name,
          lastName: payload.family_name,
          phoneNumber: 'unknown',
          picture: payload.picture,
          password: payload.email,
        },
      });
      const access_token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      res.status(201).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async registerBuyer(req, res, next) {
    try {
      const { firstName, lastName, email, password, phoneNumber, picture } =
        req.body;

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
      const products = await Product.findAll({
        order: [['id', 'ASC']],
        include: [
          {
            model: User,
            attributes: ['firstName', 'lastName', 'role'],
            through: {
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
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
                exclude: ['createdAt', 'updatedAt'],
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
            model: User,
            attributes: ['firstName', 'lastName', 'role'],
            through: {
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
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
          exclude: ['createdAt', 'updatedAt'],
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
        where: { UserId: req.user.id }, //buyer
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
                // association: 'Seller',
                model: UsersProduct,
                // as: 'Seller',
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

      // console.log(carts, 'ppppppppp');
      const newCarts = JSON.parse(JSON.stringify(carts));
      // const newCarts = Object.create(carts);
      // console.log(newCarts, 'kkkkkkkkk');
      for (let key in newCarts) {
        // console.log(newCarts[cart], 'OOOOO');
        let count = 0;
        let currentId = newCarts[key].Product.id;
        for (let key2 in newCarts) {
          if (newCarts[key2].Product.id === currentId) count++;
        }
        newCarts[key].Product.qty = count;

        console.log(newCarts[key].Product.qty);
        // if (newCarts[key].Product.qty > 1) delete newCarts[key].Product;
      }

      res.status(200).json(newCarts);
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
}

module.exports = BuyerController;
