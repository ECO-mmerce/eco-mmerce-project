const { OAuth2Client } = require(`google-auth-library`);

const { signToken } = require('../helpers/jwt');
const { checkPassword } = require('../helpers/bcrypt');
const { Product, User, Brand, Category } = require('../models');

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

  static async getCart(req, res, next) {
    try {
      let products = await Product.findAll({ where: req.params.id });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BuyerController;
