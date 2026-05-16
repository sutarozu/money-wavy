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
  console.log(req.user);
  console.log(req.body);
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

// DELETE Transactions
router.delete('/:id', protect, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found',
      });
    }

    if (transaction.userId.toString() !== req.user.id) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    await transaction.deleteOne();

    res.json({
      message: 'Transaction deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// EDIT Transactions
router.put('/:id', protect, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found',
      });
    }

    if (transaction.userId.toString() !== req.user.id) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
