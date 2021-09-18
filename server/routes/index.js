const router = require('express').Router();

const chats = require('./chatRouter');
const buyer = require('./buyerRouter');
const brands = require('./brandRouter');
const seller = require('./sellerRouter');
const categories = require('./categoryRouter');
const harmfulIngridients = require('./ingridientsRouter');

router.use('/buyers', buyer);
router.use('/chats', chats);
router.use('/brands', brands);
router.use('/sellers', seller);
router.use('/categories', categories);
router.use('/ingridients', harmfulIngridients);

module.exports = router;
