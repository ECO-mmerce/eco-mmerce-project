const { OAuth2Client } = require(`google-auth-library`);

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class BuyerController {
  static async loginBuyer(req, res, next) {
    res.send('ea login');
  }

  static async googleLoginBuyer(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      let { email } = ticket.getPayload();
    } catch (err) {
      res.send('error mas');
    }
  }

  static async registerBuyer(req, res, next) {
    res.send('ea ke register');
  }

  static async getAllProducts(req, res, next) {
    res.send('ini produk nya mas');
  }

  static async getProduct(req, res, next) {
    res.send('nih produk nya  mas');
  }
}

module.exports = BuyerController;
