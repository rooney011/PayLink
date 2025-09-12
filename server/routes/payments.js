import express from 'express';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { authenticateToken } from '../middleware/auth.js';
import blockchainService from '../utils/blockchain.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Send payment
router.post('/send', authenticateToken, async (req, res) => {
  try {
    const { recipientEmail, amount, currency = 'USD' } = req.body;

    if (!recipientEmail || !amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid recipient or amount' });
    }

    // Convert amount to USD for tier calculation
    const usdAmount = currency === 'USD' ? amount : amount / 83.33;
    
    // Check transaction limits and calculate fees
    let fee = 0;
    const sender = await User.findById(req.user._id);
    
    // Free tier: $0-$5 (maximum 5 transactions per user)
    if (usdAmount <= 5) {
      if (sender.transactionCount >= 5) {
        return res.status(400).json({ 
          message: 'Free tier limit exceeded. You can only make 5 free transactions.' 
        });
      }
    } else if (usdAmount <= 56) {
      // Micro-fee tier: $6-$56 (0.5% fee)
      fee = amount * 0.005;
    } else {
      // Business tier: Above $56 (1.5% fee)
      fee = amount * 0.015;
    }

    // Get sender
    const totalAmount = amount + fee;
    if (sender.balance < totalAmount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Get recipient
    const recipient = await User.findOne({ email: recipientEmail });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found. They need to register first.' });
    }

    if (sender.email === recipient.email) {
      return res.status(400).json({ message: 'Cannot send payment to yourself' });
    }

    // For demo, simulate blockchain transaction
    // In production, uncomment:
    // const txHash = await blockchainService.sendUSDC(
    //   sender.privateKey,
    //   recipient.walletAddress,
    //   amount
    // );

    const txHash = '0x' + Math.random().toString(16).substring(2, 66);

    // Generate invoice for transactions above $57 USD or ₹5000 INR
    let invoiceId = null;
    const invoiceThreshold = currency === 'USD' ? 57 : 5000;
    if (amount >= invoiceThreshold) {
      invoiceId = `INV-${uuidv4().substring(0, 8).toUpperCase()}`;
    }

    // Update balances
    sender.balance -= totalAmount;
    recipient.balance += amount;
    sender.transactionCount = (sender.transactionCount || 0) + 1;
    
    await sender.save();
    await recipient.save();

    // Create transactions for both users
    const senderTransaction = new Transaction({
      fromEmail: sender.email,
      toEmail: recipient.email,
      fromWallet: sender.walletAddress,
      toWallet: recipient.walletAddress,
      amount,
      txHash,
      status: 'completed',
      type: 'sent',
      fee,
      invoiceId,
      currency
    });

    const recipientTransaction = new Transaction({
      fromEmail: sender.email,
      toEmail: recipient.email,
      fromWallet: sender.walletAddress,
      toWallet: recipient.walletAddress,
      amount,
      txHash,
      status: 'completed',
      type: 'received',
      fee,
      invoiceId,
      currency
    });

    await senderTransaction.save();
    await recipientTransaction.save();

    res.json({
      message: 'Payment sent successfully',
      txHash,
      newBalance: sender.balance,
      fee,
      invoiceId
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ message: 'Error processing payment' });
  }
});

export default router;