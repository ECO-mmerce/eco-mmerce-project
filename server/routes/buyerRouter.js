const router = require('express').Router();

const BuyerController = require('../controllers/buyerController.js');
const authentication = require('../middlewares/authentication.js');
const { authorizationBuyer } = require('../middlewares/authorization.js');
const uploadImage = require('../middlewares/imagekit');
const upload = require('../middlewares/multer');

router.post('/login', BuyerController.loginBuyer);
router.post(
  '/register',
  upload.single('picture'),
  uploadImage,
  BuyerController.registerBuyer
);

router.get('/products', BuyerController.getProducts);
router.get('/products/:id', BuyerController.getProduct);

router.use(authentication);
router.use(authorizationBuyer);

router.get('/carts', BuyerController.getCarts);
router.post('/carts', BuyerController.createCart);

module.exports = router;
