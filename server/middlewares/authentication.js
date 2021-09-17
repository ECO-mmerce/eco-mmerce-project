const { User } = require(`../models`);
const { verifyToken } = require(`../helpers/jwt`);

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (access_token) {
      const payload = verifyToken(access_token);
      const user = await User.findByPk(payload.id);
      if (user) {
        req.user = {
          id: payload.id,
          email: payload.email,
          role: payload.role,
        };
        next();
      } else {
        throw { name: 'Unauthorized', message: `You are not authorized !` };
      }
    } else {
      throw { name: 'Unauthorized', message: `You are not authorized !` };
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
