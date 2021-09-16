class SellerController {
  static async loginSeller(req, res, next) {
    res.send('ea login');
  }

  static async registerSeller(req, res, next) {
    res.send('ea ke register');
  }

  static async getAllProducts(req, res, next) {
    res.send('nih produk2nya');
  }

  static async getProduct(req, res, next) {
    res.send('nih produknya mas');
  }

  static async createProduct(req, res, next) {
    res.send('ea ke buat berhasil mas');
  }

  static async updateProduct(req, res, next) {
    res.send('nih mo ngedit ya?');
  }

  static async deleteProduct(req, res, next) {
    res.send('yah keapus mas');
  }
}

module.exports = SellerController;
