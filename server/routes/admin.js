import express from 'express';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get admin stats
router.get('/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    
    // Calculate total volume
    const volumeAggregation = await Transaction.aggregate([
      { $group: { _id: null, totalVolume: { $sum: '$amount' } } }
    ]);
    const totalVolume = volumeAggregation[0]?.totalVolume || 0;
    
    // Active users (users with at least one transaction)
    const activeUsersAggregation = await Transaction.aggregate([
      { $group: { _id: '$fromEmail' } },
      { $count: 'activeUsers' }
    ]);
    const activeUsers = activeUsersAggregation[0]?.activeUsers || 0;

    res.json({
      totalUsers,
      totalTransactions,
      totalVolume,
      activeUsers
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ message: 'Error fetching admin stats' });
  }
});

// Get all users
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password -privateKey').sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    console.error('Admin users fetch error:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Get all transactions
router.get('/transactions', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const transactions = await Transaction.find({}).sort({ createdAt: -1 });
    res.json({ transactions });
  } catch (error) {
    console.error('Admin transactions fetch error:', error);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});

export default router;