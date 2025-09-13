import React, { useState } from 'react';
import { Check, Calculator, CreditCard, Zap, Star, Shield, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation } from '../contexts/LocationContext';
import { usePremium } from '../contexts/PremiumContext';

const PricingPage: React.FC = () => {
  const { theme } = useTheme();
  const { currency } = useLocation();
  const { upgradeToPremium, loading: premiumLoading } = usePremium();
  const [calculatorAmount, setCalculatorAmount] = useState<string>('1000');
  const [isAnnual, setIsAnnual] = useState(false);

  const currencySymbol = currency === 'USD' ? '$' : '₹';
  const conversionRate = currency === 'USD' ? 1 : 83.33;
  
  const calculateFee = (amount: number) => {
    const usdAmount = currency === 'USD' ? amount : amount / conversionRate;
    if (usdAmount <= 5) return 0; // Free tier
    if (usdAmount <= 56) return amount * 0.005; // 0.5%
    if (usdAmount <= 56) return amount * 0.005; // 0.5%
    return amount * 0.015; // 1.5% (1% + 0.5% tax)
  };

  const PricingTier: React.FC<{
    title: string;
    description: string;
    range: string;
    fee: string;
    features: string[];
    highlight?: boolean;
  }> = ({ title, description, range, fee, features, highlight = false }) => (
    <div className={`p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
      highlight 
        ? theme === 'dark' 
          ? 'bg-gradient-to-br from-emerald-900 to-emerald-800 border-emerald-600 ring-2 ring-emerald-500' 
          : 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-300 ring-2 ring-emerald-500'
        : theme === 'dark' 
          ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
          : 'bg-white border-gray-200 hover:bg-gray-50'
    }`}>
      {highlight && (
        <div className="flex justify-center mb-4">
          <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className={`text-2xl font-bold mb-2 ${
          highlight 
            ? theme === 'dark' ? 'text-emerald-100' : 'text-emerald-900'
            : theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h3>
        <p className={`text-sm mb-4 ${
          highlight 
            ? theme === 'dark' ? 'text-emerald-200' : 'text-emerald-700'
            : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {description}
        </p>
        <div className={`text-sm font-medium mb-2 ${
          highlight 
            ? theme === 'dark' ? 'text-emerald-200' : 'text-emerald-700'
            : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {range}
        </div>
        <div className={`text-3xl font-bold ${
          highlight 
            ? theme === 'dark' ? 'text-emerald-100' : 'text-emerald-900'
            : theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {fee}
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <Check className={`h-5 w-5 ${
              highlight ? 'text-emerald-400' : 'text-emerald-600'
            }`} />
            <span className={`text-sm ${
              highlight 
                ? theme === 'dark' ? 'text-emerald-100' : 'text-emerald-800'
                : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Simple, Transparent Pricing
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Pay only for what you use. No hidden fees, no surprises. Start free and scale as you grow.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <PricingTier
            title="Free Tier"
            description="Perfect for getting started"
            range={`Transactions under ${currencySymbol}${currency === 'USD' ? '5' : '415'}`}
            fee={`${currencySymbol}0`}
            features={[
              "No transaction fees",
              "Maximum 5 transactions",
              "Maximum 5 transactions",
              "Basic email support",
              "Standard processing time",
              "Mobile app access",
              "Basic transaction history"
            ]}
          />

          <PricingTier
            title="Micro-fee Tier"
            description="For regular users"
            range={`${currencySymbol}${currency === 'USD' ? '6 - $56' : '415 - ₹4,665'}`}
            fee="0.5%"
            features={[
              "Low transaction fees",
              "Priority email support",
              "Faster processing",
              "Advanced transaction history",
              "Monthly reports",
              "API access"
            ]}
            highlight={true}
          />

          <PricingTier
            title="Business Tier"
            description="For high-value transactions"
            range={`Above ${currencySymbol}${currency === 'USD' ? '56' : '4,665'}`}
            fee="1.5%"
            features={[
              "Includes 1% tax fee",
              "24/7 phone support",
              "Instant processing",
              "Advanced analytics",
              "Custom reporting",
              "Dedicated account manager"
            ]}
          />
        </div>

        {/* Fee Calculator */}
        <div className={`rounded-2xl border p-8 mb-16 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <Calculator className={`h-6 w-6 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Fee Calculator
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Transaction Amount ({currency})
              </label>
              <input
                type="number"
                value={calculatorAmount}
                onChange={(e) => setCalculatorAmount(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border text-lg ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                placeholder="Enter amount"
              />
            </div>
            
            <div className={`p-6 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    Transaction Amount:
                  </span>
                  <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {currencySymbol}{parseFloat(calculatorAmount || '0').toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    Processing Fee:
                  </span>
                  <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {currencySymbol}{calculateFee(parseFloat(calculatorAmount || '0')).toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-3 border-gray-300 dark:border-gray-600">
                  <div className="flex justify-between">
                    <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Total Cost:
                    </span>
                    <span className={`font-bold text-lg ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      {currencySymbol}{(parseFloat(calculatorAmount || '0') + calculateFee(parseFloat(calculatorAmount || '0'))).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Features */}
        <div className={`rounded-2xl border p-8 mb-16 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-purple-900 to-indigo-900 border-purple-600' 
            : 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200'
        }`}>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Star className={`h-8 w-8 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
              <h2 className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Premium Features
              </h2>
            </div>
            <p className={`text-lg ${
              theme === 'dark' ? 'text-purple-200' : 'text-purple-700'
            }`}>
              Unlock advanced capabilities for just {currencySymbol}{currency === 'USD' ? '1.19' : '99'}/month
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  !isAnnual 
                    ? 'bg-purple-600 text-white' 
                    : theme === 'dark' 
                      ? 'bg-purple-800 text-purple-200' 
                      : 'bg-purple-100 text-purple-700'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  isAnnual 
                    ? 'bg-purple-600 text-white' 
                    : theme === 'dark' 
                      ? 'bg-purple-800 text-purple-200' 
                      : 'bg-purple-100 text-purple-700'
                }`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-purple-800/50' : 'bg-white/70'
            }`}>
              <CreditCard className={`h-8 w-8 mb-4 ${
                theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
              }`} />
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Automated Invoicing
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-purple-200' : 'text-purple-700'
              }`}>
                Generate and send professional invoices automatically
              </p>
            </div>

            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-purple-800/50' : 'bg-white/70'
            }`}>
              <TrendingUp className={`h-8 w-8 mb-4 ${
                theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
              }`} />
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Currency Insights
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-purple-200' : 'text-purple-700'
              }`}>
                Real-time exchange rates and conversion analytics
              </p>
            </div>

            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-purple-800/50' : 'bg-white/70'
            }`}>
              <Zap className={`h-8 w-8 mb-4 ${
                theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
              }`} />
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                UPI & Card Integration
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-purple-200' : 'text-purple-700'
              }`}>
                Accept payments through multiple channels
              </p>
            </div>

            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-purple-800/50' : 'bg-white/70'
            }`}>
              <Shield className={`h-8 w-8 mb-4 ${
                theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
              }`} />
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Advanced Analytics
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-purple-200' : 'text-purple-700'
              }`}>
                Detailed reports and business intelligence
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className={`text-4xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {currencySymbol}{currency === 'USD' ? (isAnnual ? '0.95' : '1.19') : (isAnnual ? '79' : '99')}
              <span className={`text-lg font-normal ${
                theme === 'dark' ? 'text-purple-200' : 'text-purple-600'
              }`}>
                /month
              </span>
            </div>
            {isAnnual && (
              <p className={`text-sm mb-4 ${
                theme === 'dark' ? 'text-purple-200' : 'text-purple-600'
              }`}>
                Billed annually ({currencySymbol}{currency === 'USD' ? '11.40' : '948'}/year)
              </p>
            )}
            <button 
              onClick={upgradeToPremium}
              disabled={premiumLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {premiumLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <span>Upgrade to Premium</span>
              )}
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={`rounded-2xl border p-8 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Are there any hidden fees?
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                No hidden fees. Our pricing is completely transparent with no setup costs or monthly minimums.
              </p>
            </div>
            
            <div>
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Can I change plans anytime?
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            
            <div>
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                What payment methods do you accept?
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                We accept all major credit cards, debit cards, {currency === 'INR' ? 'UPI, ' : ''}and bank transfers.
              </p>
            </div>
            
            <div>
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Is there a free trial for Premium?
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Yes, we offer a 14-day free trial for all Premium features. No credit card required.
              </p>
            </div>
          </div>
        </div>

        {/* Tax Compliance Disclaimer */}
        <div className={`rounded-2xl border p-8 mt-8 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-800' 
            : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
        }`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Tax Compliance & Platform Guidance
          </h2>
          
          <div className={`p-6 rounded-lg mb-6 ${
            theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/70'
          }`}>
            <p className={`text-center mb-6 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              This platform provides compliance support integration but does not handle taxes directly.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'
              }`}>
                <h3 className={`font-semibold mb-3 flex items-center ${
                  theme === 'dark' ? 'text-blue-300' : 'text-blue-800'
                }`}>
                  🇺🇸 U.S. Users
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-blue-200' : 'text-blue-700'
                }`}>
                  Stablecoins are taxed under capital gains rules. For 1:1 redemptions (e.g., 1 USDC = $1), 
                  tax impact is typically negligible. Any gains are subject to short-term (ordinary income rates: 10%-37%) 
                  or long-term capital gains tax (0%, 15%, or 20% based on income).
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'
              }`}>
                <h3 className={`font-semibold mb-3 flex items-center ${
                  theme === 'dark' ? 'text-green-300' : 'text-green-800'
                }`}>
                  🇮🇳 Indian Users
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-green-200' : 'text-green-700'
                }`}>
                  Stablecoins are classified as Virtual Digital Assets (VDA) with a flat 30% tax on profits 
                  plus 1% TDS on transfers above specified thresholds.
                </p>
              </div>
            </div>
            
            <div className={`mt-6 p-4 rounded-lg text-center ${
              theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'
            }`}>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-purple-200' : 'text-purple-700'
              }`}>
                Our platform can help users auto-track cost basis and generate tax reports to simplify compliance and adoption.
              </p>
            </div>
          </div>
        </div>

        {/* Tax Compliance Disclaimer */}
        <div className={`rounded-2xl border p-8 mt-8 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-800' 
            : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
        }`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Tax Compliance & Platform Guidance
          </h2>
          
          <div className={`p-6 rounded-lg mb-6 ${
            theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/70'
          }`}>
            <p className={`text-center mb-6 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              This platform provides compliance support integration but does not handle taxes directly.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'
              }`}>
                <h3 className={`font-semibold mb-3 flex items-center ${
                  theme === 'dark' ? 'text-blue-300' : 'text-blue-800'
                }`}>
                  🇺🇸 U.S. Users
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-blue-200' : 'text-blue-700'
                }`}>
                  Stablecoins are taxed under capital gains rules. For 1:1 redemptions (e.g., 1 USDC = $1), 
                  tax impact is typically negligible. Any gains are subject to short-term (ordinary income rates: 10%-37%) 
                  or long-term capital gains tax (0%, 15%, or 20% based on income).
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'
              }`}>
                <h3 className={`font-semibold mb-3 flex items-center ${
                  theme === 'dark' ? 'text-green-300' : 'text-green-800'
                }`}>
                  🇮🇳 Indian Users
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-green-200' : 'text-green-700'
                }`}>
                  Stablecoins are classified as Virtual Digital Assets (VDA) with a flat 30% tax on profits 
                  plus 1% TDS on transfers above specified thresholds.
                </p>
              </div>
            </div>
            
            <div className={`mt-6 p-4 rounded-lg text-center ${
              theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'
            }`}>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-purple-200' : 'text-purple-700'
              }`}>
                Our platform can help users auto-track cost basis and generate tax reports to simplify compliance and adoption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;