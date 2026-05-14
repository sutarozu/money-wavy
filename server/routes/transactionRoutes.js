const express = require('express');
const Transaction = require('../models/Transaction');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// GET Transactions
router.get('/', protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE Transaction
router.post('/', protect, async (req, res) => {
  try {
    const { title, amount, type, category } = req.body;

    const transaction = await Transaction.create({
      userId: req.user.id,
      title,
      amount,
      type,
      category,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
