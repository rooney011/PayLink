import React, { useState } from 'react';
import { X, Plus, CreditCard, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from '../contexts/LocationContext';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TopUpModal: React.FC<TopUpModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1); // 1: amount, 2: payment method, 3: success
  
  const { token } = useAuth();
  const { currency } = useLocation();

  const currencySymbol = currency === 'USD' ? '$' : '₹';
  const conversionRate = currency === 'USD' ? 1 : 83.33;
  const stablecoinRate = currency === 'USD' ? 1 : 0.012; // Same number of stablecoins for both currencies

  const quickAmounts = currency === 'USD' ? [10, 25, 50, 100] : [100, 500, 1000, 2500];

  const handleTopUp = async () => {
    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Actually add funds to user's account
      await axios.post(`${API_URL}/wallet/topup`, {
        amount: parseFloat(amount),
        currency: currency
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSuccess(true);
      setStep(3);
      
      setTimeout(() => {
        onSuccess();
        onClose();
        setSuccess(false);
        setAmount('');
        setStep(1);
      }, 3000);
    } catch (error) {
      console.error('Top up failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Up Balance</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        {step === 1 && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount ({currency})
              </label>
              <input
                type="number"
                step="1"
                min="10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder={`Enter amount in ${currency}`}
              />
              <p className="text-sm text-gray-500 mt-2">
                ≈ {amount ? (parseFloat(amount) * stablecoinRate).toFixed(2) : '0.00'} USDC
              </p>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Quick amounts</p>
              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount.toString())}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    {currencySymbol}{quickAmount}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!amount || parseFloat(amount) < 10}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Payment Summary</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Amount ({currency})</span>
                  <span>{currencySymbol}{amount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversion Rate</span>
                  <span>1 {currency} = {stablecoinRate} USDC</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>You'll receive</span>
                  <span>{(parseFloat(amount) * stablecoinRate).toFixed(2)} USDC</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-6 w-6 text-gray-600" />
                  <div>
                    <div className="font-medium">Demo Payment</div>
                    <div className="text-sm text-gray-500">This is a simulated payment for demo purposes</div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleTopUp}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  <span>Complete Purchase</span>
                </>
              )}
            </button>
          </>
        )}

        {step === 3 && (
          <div className="text-center py-8">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Top Up Successful!</h3>
            <p className="text-gray-600 mb-4">
              Your account has been credited with {(parseFloat(amount) * stablecoinRate).toFixed(2)} USDC
            </p>
            <div className="text-sm text-gray-500">
              Processing time: ~2-5 minutes
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopUpModal;