const router = require('express').Router();
const upload = require('../middlewares/multer');
const uploadImage = require('../middlewares/imagekit');
const test= require('../middlewares/test')
const authentication = require('../middlewares/authentication');
const ChatController = require('../controllers/chatController');
const SellerController = require('../controllers/sellerController');

const { authorization } = require('../middlewares/authorization');
const detectIngredients = require('../middlewares/cloudVision');
const checkIngredients = require('../middlewares/checkIngredients');

router.post('/login', SellerController.loginSeller);
router.post(
  '/register',
  upload.single('picture'),
  uploadImage,
  SellerController.registerSeller
);

router.use(authentication);
router.use(authorization);
router.get('/chats', ChatController.getBuyerChat);
router.get('/products', SellerController.getAllProducts);
router.post(
  '/products',
  // test,
  upload.fields([
    { name: 'ingredients', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]),
  detectIngredients,
  checkIngredients,
  uploadImage,
  SellerController.createProduct
);
router.get('/products/:id', SellerController.getProduct);
router.put('/products/:id', SellerController.updateProduct);
router.delete('/products/:id', SellerController.deleteProduct);

module.exports = router;
