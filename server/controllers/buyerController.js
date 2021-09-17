const { OAuth2Client } = require(`google-auth-library`);

const { Product, Category, Seller } = require('../models/');
const { signToken, verifyToken } = require('../helpers/jwt');
const { checkPassword } = require('../helpers/bcrypt');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class BuyerController {
  static async loginBuyer(req, res, next) {
    // res.send('ea login');
    try {
      const { email, password } = req.body;
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
      let { email } = ticket.getPayload();
    } catch (err) {
      next(err);
    }
  }

  static async registerBuyer(req, res, next) {
    res.send('ea ke register');
  }

  static async getAllProducts(req, res, next) {
    try {
      const products = await Product.findAll({
        order: [['id', 'ASC']],
        include: [{ model: Category }, { model: Seller }],
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async getProduct(req, res, next) {
    try {
      const { id } = req.params.id;
      const product = await Product.findOne(id);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BuyerController;
