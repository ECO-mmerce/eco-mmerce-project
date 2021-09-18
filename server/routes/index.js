const router = require('express').Router();

const seller = require('./sellerRouter');
const buyer = require('./buyerRouter');
const categories = require('./categoryRouter');
const brands = require('./brandRouter');
const harmfulIngridients = require('./ingridientsRouter');

router.use('/sellers', seller);
router.use('/buyers', buyer);
router.use('/ingridients', harmfulIngridients);
router.use('/categories', categories);
router.use('/brands', brands);

module.exports = router;
