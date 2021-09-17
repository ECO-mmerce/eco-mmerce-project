const { HarmfulIngridient } = require('../models');

class HarmfulIngridientController {
  static async getHarmfulIngredients(req, res, next) {
    try {
      const harmfulIngridients = await HarmfulIngridient.findAll({
        order: [['id', 'ASC']],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });

      res.status(200).json(harmfulIngridients);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = HarmfulIngridientController;
