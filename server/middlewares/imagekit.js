const FormData = require('form-data');
const imagekitAPI = require('../apis/imagekit');
const getDate = require('../helpers/getDate');

async function uploadImage(req, res, next) {
  // console.log(req.file, `INI DI IMAGE KIT`);
  try {
    // console.log(req.baseUrl); // /sellers
    // console.log(req.url); // register
    // console.log(req.originalUrl); // /sellers/register
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
    } else if (req.url === '/products' && req.files.image) {
      // console.log(req.files.image);
      const fileName = 'image_' + getDate();
      const data = new FormData();
      data.append('file', req.files.image[0].buffer.toString('base64'));
      data.append('fileName', fileName);

      const response = await imagekitAPI.post('/upload', data, {
        headers: {
          ...data.getHeaders(),
        },
      });

      req.body.picture = response.data.url;
      next();
    } else {
      // User register without prof pic
      next();
    }
  } catch (err) {
    // console.log(err);
    next(err);
  }
}

module.exports = uploadImage;
