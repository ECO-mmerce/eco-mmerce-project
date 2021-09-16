const FormData = require('form-data');
const imagekitAPI = require('../apis/imagekitAPI');
const getDate = require('../helpers/getDate');

async function uploadImage(req, res, next) {
  try {
    if (req.file) {
      const fileName = 'image_' + getDate();
      const data = new FormData();
      data.append('file', req.file.buffer.toString('base64'));
      data.append('fileName', fileName);

      const response = await imagekitAPI.post('/upload', data, {
        headers: {
          ...data.getHeaders(),
        },
      });

      req.imgUrl = response.data.url;
      next();
    } else {
      const error = new Error();
      error.name = 'Bad Request';
      error.message = 'Please select an image';

      throw error;
    }
  } catch (err) {
    next(err);
  }
}

module.exports = uploadImage;