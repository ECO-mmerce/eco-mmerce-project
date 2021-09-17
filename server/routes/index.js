const router = require('express').Router();

const seller = require('./sellerRouter');
const buyer = require('./buyerRouter');

router.use('/seller', seller);
router.use('/buyer', buyer);

module.exports = router;
