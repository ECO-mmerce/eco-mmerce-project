const CategoryController = require('../controllers/categoryController');

const router = require('express').Router();

router.get('/', CategoryController.getCategories);

module.exports = router;
