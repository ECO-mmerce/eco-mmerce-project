const { Chat, User } = require('../models');
const { Sequelize } = require('sequelize');

class ChatController {
  static async getChat(req, res, next) {
    try {
      const filter = {
        BuyerId: req.user.role === 'buyer' ? req.user.id : req.params.id,
        SellerId: req.user.role === 'seller' ? req.user.id : req.params.id,
      };
      const chat = await Chat.findAll({
        order: [['id', 'ASC']],
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        where: filter,
      });

      res.status(200).json(chat);
    } catch (err) {
      next(err);
    }
  }

  static async getBuyerChat(req, res, next) {
    try {
      const { id: SellerId } = req.user;
      const chat = await Chat.findAll({
        where: { SellerId },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'fullName', 'message', 'id'],
        },
        include: { model: User, attributes: ['id', 'firstName', 'lastName'] },
        group: ['Chat.SellerId', 'Chat.BuyerId', 'User.id'],
      });

      console.log(chat);
      res.status(200).json(chat);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ChatController;
