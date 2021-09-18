const { Category } = require('../models');

class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        order: [['id', 'ASC']],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });

      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
