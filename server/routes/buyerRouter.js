const router = require('express').Router();

const BuyerController = require('../controllers/buyerController.js');
const authentication = require('../middlewares/authentication.js');
const { authorizationBuyer } = require('../middlewares/authorization.js');

router.post('/login', BuyerController.loginBuyer);
router.post('/register', BuyerController.registerBuyer);

router.get('/products', BuyerController.getProducts);
router.get('/products/:id', BuyerController.getProduct);

router.use(authentication);
router.use(authorizationBuyer);

router.get('/carts', BuyerController.getCarts);
router.post('/carts', BuyerController.createCart);

module.exports = router;
