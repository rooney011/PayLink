import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
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
    default: null
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