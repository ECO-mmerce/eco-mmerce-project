const router = require('express').Router();

const BuyerController = require('../controllers/buyerController.js');
const authentication = require('../middlewares/authentication.js');
const { authorizationBuyer } = require('../middlewares/authorization.js');
const checkIngredients = require('../middlewares/checkIngredients.js');
const detectIngredients = require('../middlewares/cloudVision.js');
const uploadImage = require('../middlewares/imagekit');
const upload = require('../middlewares/multer');
const test = require('../middlewares/test.js');

router.post('/login', BuyerController.loginBuyer);
router.post('/login/google', BuyerController.googleLoginBuyer);
router.post(
  '/register',
  upload.single('picture'),
  uploadImage,
  BuyerController.registerBuyer
);

router.get('/products', BuyerController.getProducts);
router.get('/products/:id', BuyerController.getProduct);
router.use(
  '/checkIngredients',
  upload.fields([
    { name: 'ingredients', maxCount: 1 },
  ]),
  // test,
  detectIngredients, 
  checkIngredients,
  BuyerController.ingredientsCheck
)

router.use(authentication);
router.use(authorizationBuyer);

router.get('/carts', BuyerController.getCarts);
router.post('/carts', BuyerController.createCart);
router.get('/history', BuyerController.getHistory);
router.delete('/carts', BuyerController.deleteCart);
router.delete('/carts/:id', BuyerController.removeQty);
router.post('/carts/checkout', BuyerController.checkOut);

module.exports = router;
