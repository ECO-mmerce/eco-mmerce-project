const router = require('express').Router();
const upload = require('../middlewares/multer');
const uploadImage = require('../middlewares/imagekit');
const detectIngredients = require('../middlewares/cloudVision')

const SellerController = require('../controllers/sellerController');
const authentication = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');
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
router.get('/products', SellerController.getAllProducts);
router.post('/products',upload.fields([{name: 'ingredients', maxCount: 1}, {name: 'image', maxCount: 1}]), detectIngredients, uploadImage, checkIngredients, SellerController.createProduct);
router.get('/products/:id', SellerController.getProduct);
router.put('/products/:id', SellerController.updateProduct);
router.delete('/products/:id', SellerController.deleteProduct);

module.exports = router;
