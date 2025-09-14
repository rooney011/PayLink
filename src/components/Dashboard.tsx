import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownLeft, Plus, QrCode, CreditCard, Eye, EyeOff, Wallet } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation } from '../contexts/LocationContext';
import { Transaction } from '../types';
import axios from 'axios';
import SendPaymentModal from './SendPaymentModal';
import ReceivePaymentModal from './ReceivePaymentModal';
import TopUpModal from './TopUpModal';
import WithdrawModal from './WithdrawModal';
import InvoiceModal from './InvoiceModal';
import { Invoice } from '../types';

const API_URL = 'http://localhost:5000/api';

const Dashboard: React.FC = () => {
  const { user, token } = useAuth();
  const { theme } = useTheme();
  const { currency } = useLocation();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const currencySymbol = currency === 'USD' ? '$' : '₹';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [balanceRes, transactionsRes] = await Promise.all([
        axios.get(`${API_URL}/wallet/balance`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/transactions`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      
      setBalance(balanceRes.data.balance);
      setTransactions(transactionsRes.data.transactions);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvoiceClick = (transaction: Transaction) => {
    if (transaction.invoiceId) {
      const invoice: Invoice = {
        id: transaction.invoiceId,
        transactionId: transaction.transactionId || transaction._id,
        amount: transaction.amount,
        currency: transaction.currency || currency,
        fee: transaction.fee || 0,
        fromEmail: transaction.fromEmail,
        toEmail: transaction.toEmail,
        createdAt: transaction.createdAt,
        status: 'paid'
      };
      setSelectedInvoice(invoice);
      setShowInvoiceModal(true);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Welcome back, {user?.name}!
          </h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your USDC payments and view transaction history
          </p>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-emerald-600 to-indigo-400 rounded-2xl p-8 text-white mb-8 shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Wallet className="h-6 w-6" />
                <span className="text-blue-100">Total Balance</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold">
                  {showBalance ? `${balance.toFixed(2)} USDC` : '••••••'}
                </div>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-emerald-200 hover:text-white transition-colors"
                >
                  {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-blue-100 text-sm mt-1">
                ≈ {currencySymbol}{(balance * (currency === 'USD' ? 1 : 83.33)).toFixed(2)} {currency}
              </p>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">Wallet Address</p>
              <p className="text-sm font-mono bg-white/20 px-3 py-1 rounded-lg mt-1">
                {formatAddress(user?.walletAddress || '')}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setShowSendModal(true)}
            className={`p-6 rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <ArrowUpRight className="h-6 w-6 text-white" />
            </div>
            <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Send</span>
          </button>

          <button
            onClick={() => setShowReceiveModal(true)}
            className={`p-6 rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <ArrowDownLeft className="h-6 w-6 text-white" />
            </div>
            <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Receive</span>
          </button>

          <button
            onClick={() => setShowTopUpModal(true)}
            className={`p-6 rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="bg-orange-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Top Up</span>
          </button>

          <button
            onClick={() => setShowWithdrawModal(true)}
            className={`p-6 rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Withdraw</span>
          </button>
        </div>

        {/* Transactions */}
        <div className={`rounded-2xl shadow-sm border p-6 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Recent Transactions
          </h2>
          
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <CreditCard className={`h-8 w-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
              </div>
              <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                No transactions yet
              </h3>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Start by sending your first payment!
              </p>
              <button
                onClick={() => setShowSendModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Send Payment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.slice(0, 10).map((transaction) => (
                <div 
                  key={transaction._id} 
                  className={`flex items-center justify-between p-4 rounded-xl transition-colors duration-200 cursor-pointer ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-gray-50 hover:bg-gray-100'
                }`}
                  onClick={() => handleInvoiceClick(transaction)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'sent' ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      {transaction.type === 'sent' ? 
                        <ArrowUpRight className={`h-5 w-5 ${transaction.type === 'sent' ? 'text-red-600' : 'text-green-600'}`} /> :
                        <ArrowDownLeft className={`h-5 w-5 ${transaction.type === 'received' ? 'text-red-600' : 'text-green-600'}`} />
                      }
                    </div>
                    <div>
                      <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {transaction.type === 'sent' ? 'Sent to' : 'Received from'} {
                          transaction.type === 'sent' ? transaction.toEmail : transaction.fromEmail
                        }
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatDate(transaction.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${
                      transaction.type === 'sent' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {transaction.type === 'sent' ? '-' : '+'}{transaction.amount.toFixed(2)} USDC
                    </div>
                    <div className={`text-sm px-2 py-1 rounded-full ${
                      transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </div>
                    {transaction.invoiceId && (
                      <div className="text-xs text-blue-600 dark:text-blue-400">
                        Invoice Available
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showSendModal && (
        <SendPaymentModal
          isOpen={showSendModal}
          onClose={() => setShowSendModal(false)}
          onSuccess={fetchData}
        />
      )}

      {showReceiveModal && (
        <ReceivePaymentModal
          isOpen={showReceiveModal}
          onClose={() => setShowReceiveModal(false)}
          userEmail={user?.email || ''}
        />
      )}

      {showTopUpModal && (
        <TopUpModal
          isOpen={showTopUpModal}
          onClose={() => setShowTopUpModal(false)}
          onSuccess={fetchData}
        />
      )}

      {showWithdrawModal && (
        <WithdrawModal
          isOpen={showWithdrawModal}
          onClose={() => setShowWithdrawModal(false)}
          onSuccess={fetchData}
          currentBalance={balance}
        />
      )}

      {showInvoiceModal && selectedInvoice && (
        <InvoiceModal
          isOpen={showInvoiceModal}
          onClose={() => {
            setShowInvoiceModal(false);
            setSelectedInvoice(null);
          }}
          invoice={selectedInvoice}
        />
      )}
    </div>
  );
};

export default Dashboard;