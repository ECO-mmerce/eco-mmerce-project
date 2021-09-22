const _ = require('lodash');

const { HarmfulIngridient } = require('../models');

async function checkIngredients(req, res, next) {
  let output = req.output;
  let status = '';
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

      if (score == 0) status = 'Eco';
      if (score == 1 || score == 2) status = 'Warn';
      if (score == 3) status = 'Harmful';
      if (score > 3) status = 'Reject';
      console.log(
        score,
        status,
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
      );

      req.body.ingridient = output.map((el) =>
        el
          .split(' ')
          .map((el) => _.capitalize(el))
          .join(' ')
      );
      req.body.status = status;
      req.body.harmfulIngridient = bodyHarmfulIngridient;

      next();
    } catch (error) {
      next(error);
    }
  }
}
module.exports = checkIngredients;
