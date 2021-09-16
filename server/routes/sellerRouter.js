const router = require('express').Router();

const SellerController = require('../controllers/sellerController');

router.post('/login', SellerController.loginSeller);
router.post('/register', SellerController.registerSeller);

router.get('/products', SellerController.getAllProducts);
router.post('/products', SellerController.createProduct);
router.get('/products/:id', SellerController.getProduct);
router.put('/products/:id', SellerController.updateProduct);
router.delete('/products/:id', SellerController.deleteProduct);

module.exports = router;
