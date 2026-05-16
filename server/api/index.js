import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from '../routes/userRoutes.js';
import transactionRoutes from '../routes/transactionRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

export default app;
