const router = require('express').Router();

const ChatController = require('../controllers/chatController');
const authentication = require('../middlewares/authentication');

router.use(authentication);
router.get('/:id', ChatController.getChat);

module.exports = router;
