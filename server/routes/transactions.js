import express from 'express';
import Transaction from '../models/Transaction.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user transactions
router.get('/', authenticateToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [
        { fromEmail: req.user.email },
        { toEmail: req.user.email }
      ]
    }).sort({ createdAt: -1 });

    // Set transaction type based on user perspective
    const userTransactions = transactions.map(tx => {
      const isFromUser = tx.fromEmail === req.user.email;
      return {
        ...tx.toObject(),
        type: isFromUser ? 'sent' : 'received'
      };
    });

    res.json({ transactions: userTransactions });
  } catch (error) {
    console.error('Transaction fetch error:', error);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});

export default router;