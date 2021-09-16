if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');

const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
