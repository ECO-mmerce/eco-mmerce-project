const router = require('express').Router();

const HarmfulIngridientController = require('../controllers/ingridientController');

router.get('/', HarmfulIngridientController.getHarmfulIngredients);

module.exports = router;
