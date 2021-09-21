const { HarmfulIngridient } = require('../models');

async function checkIngredients(req, res, next) {
  let { ingridient } = req.body;
  if (ingridient) {
    try {
      let score = 0;
      let bodyHarmfulIngridient = [];
      let harmfulIngridients = await HarmfulIngridient.findAll();
      ingridient.forEach((ingredient) => {
        if (ingredient) {
          harmfulIngridients.forEach((harmfulIngridient) => {
            if (ingredient.includes(harmfulIngridient.name.toLowerCase())) {
              score++;
              bodyHarmfulIngridient.push(harmfulIngridient.name);
            }
          });
        }
      });

      if (score > 3)
        throw {
          name: 'Bad Request',
          message: `Rejected! Eco-mmerce cannot tolerate your dangerous product`,
        };

      req.body.status = score;
      req.body.harmfulIngridient = bodyHarmfulIngridient;

      next();
    } catch (error) {
      next(error);
    }
  }
}
module.exports = checkIngredients;
