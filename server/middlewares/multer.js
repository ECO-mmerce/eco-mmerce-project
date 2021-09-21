const multer = require('multer');
const upload = multer({
  fileFilter(req, file, cb) {
    console.log(file, `INI DI MULTER`);
    if (file.mimetype.includes('image')) {
      cb(null, true);
    } else {
      const error = new Error();
      error.name = 'Bad Request';
      error.message = 'File is not an image';
      cb(error, false);
    }
  },
});

module.exports = upload;
