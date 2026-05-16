import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from '../config/db.js';

import authRoutes from '../routes/authRoutes.js';
import transactionRoutes from '../routes/transactionRoutes.js';

dotenv.config();

const app = express();

await connectDB();

app.use(
  cors({
    origin: '*',
  }),
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Running...');
});

app.use('/api/users', authRoutes);

app.use('/api/transactions', transactionRoutes);

export default app;
