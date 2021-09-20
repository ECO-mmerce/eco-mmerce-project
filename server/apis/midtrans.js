const axios = require('axios').default;

const midtransAPI = axios.create({
  baseURL: 'https://app.sandbox.midtrans.com/snap/v1/transactions',
  auth: {
    username: process.env.MIDTRANS_SERVER,
    password: '',
  },
});

module.exports = midtransAPI;
