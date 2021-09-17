const { User } = require(`../models`);

async function authorization(req, res, next) {
  try {
    const { id } = req.user;
    const verifyUser = await User.findOne({ where: id });
    if (verifyUser.role === 'seller') {
      next();
    } else {
      throw {
        name: 'Forbidden',
        message: "You don't have an access to do this !",
      };
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authorization;
