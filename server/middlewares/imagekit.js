const FormData = require('form-data');
const imagekitAPI = require('../apis/imagekit');
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
    } else if(req.files.image){
      console.log(req.files.image);
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
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = uploadImage;
