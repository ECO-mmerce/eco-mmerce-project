const axios = require('axios').default;

const axiosInstance = axios.create({
  baseURL: 'https://upload.imagekit.io/api/v1/files',
  auth: {
    username: process.env.IMAGEKIT_PRIVATE,
    password: '',
  },
});

module.exports = axiosInstance;
