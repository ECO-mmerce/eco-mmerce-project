const {HarmfulIngridient} = require('../models')

async function checkIngredients(req,res,next) {
  let {ingridient} = req.body
  if(ingridient){
    try {
      let score = 0
      let harmfulIngridients = await HarmfulIngridient.findAll()
      ingridient.forEach(ingredient => {
        if(ingredient) {
          harmfulIngridients.forEach(harmfulIngridient => {
            console.log(`|${ingredient}|`, '<=>', `|${harmfulIngridient.name.toLowerCase()}|`);
            if(ingredient.includes(harmfulIngridient.name.toLowerCase())) {
              score ++
            }
          })
        }
      });
      req.body.status = score
      next()
    }
    catch(error){
      console.log(error);
    }
  }
}
module.exports = checkIngredients