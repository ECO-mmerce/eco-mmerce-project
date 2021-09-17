const router = require('express').Router();

const seller = require('./sellerRouter');
const buyer = require('./buyerRouter');
const harmfulIngridients = require('./ingridientsRouter');

router.use('/sellers', seller);
router.use('/buyers', buyer);
router.use('/ingridients', harmfulIngridients);

module.exports = router;
