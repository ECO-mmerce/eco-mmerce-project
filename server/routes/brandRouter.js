const BrandController = require('../controllers/brandController');

const router = require('express').Router();

router.get('/', BrandController.getBrands);

module.exports = router;
