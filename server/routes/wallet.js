import express from 'express';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { authenticateToken } from '../middleware/auth.js';
import blockchainService from '../utils/blockchain.js';

const router = express.Router();

// Get wallet balance
router.get('/balance', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // For demo, use database balance instead of blockchain
    // In production, you might want to sync with blockchain:
    // const blockchainBalance = await blockchainService.getUSDCBalance(user.walletAddress);
    
    res.json({ 
      balance: user.balance,
      walletAddress: user.walletAddress 
    });
  } catch (error) {
    console.error('Balance fetch error:', error);
    res.status(500).json({ message: 'Error fetching balance' });
  }
});

// Top up balance (mock on-ramp)
router.post('/topup', authenticateToken, async (req, res) => {
  try {
    const { amount, currency = 'USD' } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const user = await User.findById(req.user._id);
    
    // Same number of stablecoins for both currencies (equal purchasing power)
    const usdcAmount = currency === 'USD' ? amount * 1 : amount * 0.012;
    
    // Update user balance
    user.balance += usdcAmount;
    await user.save();

    // Record transaction
    const transaction = new Transaction({
      fromEmail: 'system@paylink.com',
      toEmail: user.email,
      fromWallet: 'system',
      toWallet: user.walletAddress,
      amount: usdcAmount,
      txHash: '0x' + Math.random().toString(16).substring(2, 66),
      status: 'completed',
      type: 'topup',
      currency
      currency
    });
    
    await transaction.save();

    res.json({ 
      message: 'Balance topped up successfully',
      newBalance: user.balance,
      usdcAmount,
      currency
      currency
    });
  } catch (error) {
    console.error('Top up error:', error);
    res.status(500).json({ message: 'Error processing top up' });
  }
});

// Withdraw balance (mock off-ramp)
router.post('/withdraw', authenticateToken, async (req, res) => {
  try {
    const { amount, currency = 'USD' } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const user = await User.findById(req.user._id);
    
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Update user balance
    user.balance -= amount;
    await user.save();

    // Record transaction
    const transaction = new Transaction({
      fromEmail: user.email,
      toEmail: 'system@paylink.com',
      fromWallet: user.walletAddress,
      toWallet: 'bank_transfer',
      amount: amount,
      txHash: '0x' + Math.random().toString(16).substring(2, 66),
      status: 'completed',
      type: 'withdrawal',
      currency
    });
    
    await transaction.save();

    res.json({ 
      message: 'Withdrawal initiated successfully',
      newBalance: user.balance,
      localAmount: amount * (currency === 'USD' ? 1 : 83.33),
      currency
    });
  } catch (error) {
    console.error('Withdrawal error:', error);
    res.status(500).json({ message: 'Error processing withdrawal' });
  }
});

export default router;