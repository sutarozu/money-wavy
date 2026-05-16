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
    origin: 'https://moneywavy.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.use(express.json());

app.use('/api/users', authRoutes);

app.use('/api/transactions', transactionRoutes);

export default app;
