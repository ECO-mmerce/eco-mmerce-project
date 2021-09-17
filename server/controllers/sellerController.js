const { Product, Category, Seller } = require('../models/');

class SellerController {
  static async loginSeller(req, res, next) {
    res.send('ea login');
  }

  static async registerSeller(req, res, next) {
    res.send('ea ke register');
  }

  static async getAllProducts(req, res, next) {
    try {
      const { id } = 1;
      const products = await Product.findAll({
        order: [[`id`, `ASC`]],
        where: id,
        include: [{ model: Category }, { model: Seller }],
      });

      res.status(200).json(products);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne(id);

      res.status(200).json(product);
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
        SellerId,
        picture,
        CategoryId,
      } = req.body;

      const newProduct = await Product.create({
        name,
        price,
        stock,
        weight,
        status,
        description,
        ingridient,
        SellerId,
        picture,
        CategoryId,
      });

      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const {
        name,
        price,
        stock,
        weight,
        status,
        description,
        ingridient,
        SellerId,
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
          SellerId,
          picture,
          CategoryId,
        },
        { where: { id }, returning: true }
      );

      res.status(200).json(updatedProduct);
    } catch (err) {
      console.log(err);
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
}

module.exports = SellerController;
