export interface User {
  _id: string;
  email: string;
  phone?: string;
  name: string;
  walletAddress: string;
  privateKey: string;
  createdAt: string;
  country?: 'US' | 'IN';
  transactionCount?: number;
}

export interface Transaction {
  _id: string;
  transactionId?: string;
  fromEmail: string;
  toEmail: string;
  fromWallet: string;
  toWallet: string;
  amount: number;
  txHash: string;
  status: 'pending' | 'completed' | 'failed';
  type: 'sent' | 'received';
  createdAt: string;
  fee?: number;
  invoiceId?: string;
  currency?: 'USD' | 'INR';
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface PaymentData {
  recipientEmail: string;
  amount: number;
  currency?: 'USD' | 'INR';
}

export interface Invoice {
  id: string;
  transactionId: string;
  amount: number;
  currency: 'USD' | 'INR';
  fee: number;
  fromEmail: string;
  toEmail: string;
  createdAt: string;
  status: 'paid' | 'pending';

}