const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.send('API Running!');
});

mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => console.log('MONGODB_Connected!'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
