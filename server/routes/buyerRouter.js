const router = require('express').Router();

const BuyerController = require('../controllers/buyerController');

router.post('/login', BuyerController.loginBuyer);
router.post('/register', BuyerController.registerBuyer);

router.get('/products', BuyerController.getAllProducts);
router.get('/products/:id', BuyerController.getProduct);

module.exports = router;
