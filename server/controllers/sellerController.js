const { signToken } = require('../helpers/jwt');
const { checkPassword } = require('../helpers/bcrypt');
const { Product, User, Brand, Category, Chat } = require('../models');

class SellerController {
  static async loginSeller(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      console.log(user);

      if (user) {
        if (checkPassword(password, user.password)) {
          const access_token = signToken({
            id: user.id,
            email: user.email,
            role: user.role,
          });

          res.status(200).json({
            access_token,
            id: user.id,
            role: user.role,
            picture: user.picture,
            firstName: user.firstName,
            lastName: user.lastName,
          });
        } else {
          throw { name: 'Unauthorized', message: 'Invalid Email or Password' };
        }
      } else {
        throw { name: 'Unauthorized', message: 'Invalid Email or Password' };
      }
    } catch (err) {
      next(err);
    }
  }

  static async registerSeller(req, res, next) {
    try {
      const { firstName, lastName, email, password, phoneNumber } = req.body;
      const picture =
        req.imgUrl ||
        'https://ik.imagekit.io/imgmarc/default-profile_4m4ooSMXJ.png?updatedAt=1629741970508';
      const newSeller = await User.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        picture,
        role: 'seller',
      });

      res.status(201).json({ id: newSeller.id, email: newSeller.email });
    } catch (err) {
      next(err);
    }
  }

  static async getAllProducts(req, res, next) {
    try {
      const { id } = req.user;
      const products = await Product.findAll({
        where: { UserId: id },
        order: [['id', 'ASC']],
        include: [
          {
            model: Category,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
          {
            model: Brand,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            through: {
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          },
        ],
        attributes: {
          exclude: [
            'weight',
            'status',
            'description',
            'ingridient',
            'createdAt',
            'updatedAt',
          ],
        },
      });

      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async getProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { id: UserId } = req.user;
      const product = await Product.findOne({
        where: [{ id }, { UserId }],
        order: [['id', 'ASC']],
        include: [
          {
            model: Category,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
          {
            model: Brand,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            through: {
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          },
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });

      if (product === null) {
        throw { name: 'Bad Request', message: 'ID not found !' };
      } else if (product.UserId !== UserId) {
        throw {
          name: 'Forbidden',
          message: "You don't have an access to do this !",
        };
      } else {
        res.status(200).json(product);
      }
    } catch (err) {
      next(err);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const {
        name,
        price,
        stock,
        weight,
        status,
        description,
        ingridient,
        picture,
        CategoryId,
        brand,
      } = req.body;

      const { id } = req.user;

      const newProduct = await Product.create(
        {
          name,
          price,
          stock,
          weight,
          status,
          UserId: id,
          description,
          ingridient,
          picture,
          CategoryId,
          Brands: { name: brand },
        },
        {
          include: [Brand],
        }
      );

      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { id: UserId } = req.user;
      const {
        name,
        price,
        stock,
        weight,
        status,
        description,
        ingridient,
        picture,
        CategoryId,
      } = req.body;

      const updatedProduct = await Product.update(
        {
          name,
          price,
          stock,
          weight,
          status,
          description,
          ingridient,
          picture,
          CategoryId,
        },
        { where: [{ id }, { UserId }], returning: true }
      );

      console.log(updatedProduct);

      if (updatedProduct[0] === 0) {
        throw { name: 'Not Found', message: 'ID not found !' };
      } else {
        res.status(200).json(updatedProduct[1]);
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const deletedProduct = await Product.destroy({ where: { id } });
      if (deletedProduct === 0) {
        throw { name: 'Not Found', message: 'ID not found !' };
      } else {
        res.status(200).json({
          message: `Product with Id ${id} has been successfully deleted!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async getChat(req, res, next) {
    try {
      const { id: SellerId } = req.user;
      const { chatWithId: BuyerId } = req.body;
      const chat = Chat.findAll({
        order: [['id', 'ASC']],
        where: { SellerId, BuyerId },
      });

      res.status(200).json(chat);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SellerController;
