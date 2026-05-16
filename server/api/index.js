import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from '../routes/authRoutes.js';
import transactionRoutes from '../routes/transactionRoutes.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: '*',
  }),
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('API Running...');
});

app.use('/api/users', authRoutes);

app.use('/api/transactions', transactionRoutes);

export default app;
