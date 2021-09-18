const { Brand } = require('../models');

class BrandController {
  static async getBrands(req, res, next) {
    try {
      const brands = await Brand.findAll({
        order: [['id', 'ASC']],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        duplicating: false,
        // include: [{ duplicating: false }],
      });

      res.status(200).json(brands);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BrandController;
