const _ = require('lodash');

const { HarmfulIngridient } = require('../models');

async function checkIngredients(req, res, next) {
  let output = req.output;
  if (output) {
    try {
      let score = 0;
      let bodyHarmfulIngridient = [];
      let harmfulIngridients = await HarmfulIngridient.findAll();
      output.forEach((output) => {
        if (output) {
          harmfulIngridients.forEach((harmfulIngridient) => {
            if (output.includes(harmfulIngridient.name.toLowerCase())) {
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

      req.body.ingridient = output.map((el) =>
        el
          .split(' ')
          .map((el) => _.capitalize(el))
          .join(' ')
      );
      req.body.status = score;
      req.body.harmfulIngridient = bodyHarmfulIngridient;

      next();
    } catch (error) {
      next(error);
    }
  }
}
module.exports = checkIngredients;
