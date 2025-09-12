import React, { useState } from 'react';
import { X, CreditCard, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from '../contexts/LocationContext';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentBalance: number;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose, onSuccess, currentBalance }) => {
  const [amount, setAmount] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: ''
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: amount, 2: bank details, 3: confirmation, 4: success
  
  const { token } = useAuth();
  const { currency } = useLocation();

  const currencySymbol = currency === 'USD' ? '$' : '₹';
  const conversionRate = currency === 'USD' ? 1 : 83.33;

  const handleWithdraw = async () => {
    setLoading(true);
    
    try {
      // Simulate bank transfer processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Actually deduct funds from user's account
      await axios.post(`${API_URL}/wallet/withdraw`, {
        amount: parseFloat(amount),
        currency: currency
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setStep(4);
      
      setTimeout(() => {
        onSuccess();
        onClose();
        setAmount('');
        setBankDetails({ accountNumber: '', ifscCode: '', accountHolderName: '' });
        setStep(1);
      }, 3000);
    } catch (error) {
      console.error('Withdrawal failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = [10, 25, 50, 100];
  const availableQuickAmounts = quickAmounts.filter(amt => amt <= currentBalance);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Withdraw to Bank</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        {step === 1 && (
          <>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Available balance: ${currentBalance.toFixed(2)} USDC</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (USDC)
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                max={currentBalance}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Enter amount in USDC"
              />
              <p className="text-sm text-gray-500 mt-2">
                ≈ {currencySymbol}{amount ? (parseFloat(amount) * conversionRate).toFixed(2) : '0.00'} {currency}
              </p>
            </div>

            {availableQuickAmounts.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Quick amounts</p>
                <div className="grid grid-cols-3 gap-2">
                  {availableQuickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount.toString())}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      ${quickAmount}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              disabled={!amount || parseFloat(amount) < 1 || parseFloat(amount) > currentBalance}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Bank Account Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    value={bankDetails.accountHolderName}
                    onChange={(e) => setBankDetails({...bankDetails, accountHolderName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter account holder name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter account number"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    value={bankDetails.ifscCode}
                    onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter IFSC code"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!bankDetails.accountHolderName || !bankDetails.accountNumber || !bankDetails.ifscCode}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                Review
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Withdrawal Summary</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span>Amount</span>
                  <span>${amount} USDC</span>
                </div>
                <div className="flex justify-between">
                  <span>Exchange Rate</span>
                  <span>1 USDC = {currencySymbol}{conversionRate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee</span>
                  <span>{currencySymbol}0 (Demo)</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>You'll receive</span>
                  <span>{currencySymbol}{(parseFloat(amount) * conversionRate).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h4 className="font-medium text-blue-900 mb-2">Bank Account</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <div>{bankDetails.accountHolderName}</div>
                  <div>{bankDetails.accountNumber}</div>
                  <div>{bankDetails.ifscCode}</div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleWithdraw}
                disabled={loading}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    <span>Confirm Withdrawal</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <div className="text-center py-8">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Withdrawal Initiated!</h3>
            <p className="text-gray-600 mb-4">
              {currencySymbol}{(parseFloat(amount) * conversionRate).toFixed(2)} will be transferred to your bank account
            </p>
            <div className="text-sm text-gray-500">
              Processing time: 1-3 business days
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawModal;