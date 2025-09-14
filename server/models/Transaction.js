import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    unique: true,
    default: () => `TXN-${uuidv4().substring(0, 8).toUpperCase()}`
  },
  fromEmail: {
    type: String,
    required: true
  },
  toEmail: {
    type: String,
    required: true
  },
  fromWallet: {
    type: String,
    required: true
  },
  toWallet: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  txHash: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed'
  },
  type: {
    type: String,
    enum: ['sent', 'received', 'topup', 'withdrawal'],
    required: true
  },
  fee: {
    type: Number,
    default: 0
  },
  invoiceId: {
    type: String,
    default: () => `INV-${uuidv4().substring(0, 8).toUpperCase()}`
  },
  currency: {
    type: String,
    enum: ['USD', 'INR'],
    default: 'USD'
  }
}, {
  timestamps: true
});

export default mongoose.model('Transaction', transactionSchema);