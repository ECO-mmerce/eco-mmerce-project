const router = require('express').Router();

const BuyerController = require('../controllers/buyerController.js');

router.post('/login', BuyerController.loginBuyer);
router.post('/register', BuyerController.registerBuyer);

router.get('/products', BuyerController.getProducts);
router.get('/products/:id', BuyerController.getProduct);

router.post('/cart');
router.get('/cart');

module.exports = router;
