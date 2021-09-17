const router = require('express').Router();

const BuyerController = require('../controllers/buyerController.js');
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

router.post('/cart');
router.get('/cart');

module.exports = router;
