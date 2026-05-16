const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('../routes/authRoutes');
const transactionRoutes = require('../routes/transactionRoutes');

dotenv.config();

const app = express();

app.use(
  cors({
    origin: '*',
  }),
);

app.use(express.json());

if (mongoose.connection.readyState !== 1) {
  mongoose.connect(process.env.MONGO_URI);
}

app.get('/', (req, res) => {
  res.send('API Running...');
});

app.use('/api/users', authRoutes);

app.use('/api/transactions', transactionRoutes);

module.exports = app;
