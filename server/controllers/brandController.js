const { Brand } = require('../models');
const _ = require('lodash');

class BrandController {
  static async getBrands(req, res, next) {
    try {
      const brands = await Brand.findAll({
        order: [['id', 'ASC']],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });

      const uniqueBrands = _.unionBy(brands, 'name');

      res.status(200).json(uniqueBrands);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BrandController;
