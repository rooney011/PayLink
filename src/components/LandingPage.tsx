import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Shield, Zap, CreditCard, Users, TrendingUp, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const LandingPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      {/* Header */}
      <header className={`relative z-10 backdrop-blur-sm border-b transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-900/80 border-gray-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-8 w-8 text-emerald-600" />
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                PayLink
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Link 
                to="/login" 
                className={`transition-colors font-medium ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-emerald-400' 
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className={`text-5xl md:text-6xl font-bold leading-tight mb-6 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Send Money
              <span className={`block text-transparent bg-clip-text transition-all duration-500 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-emerald-400 to-blue-400' 
                  : 'bg-gradient-to-r from-emerald-600 to-blue-600'
              }`}>
                Instantly, Globally
              </span>
            </h1>
            <p className={`text-xl mb-8 max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Send and receive USDC payments using just an email address. No complex wallet addresses, 
              no blockchain knowledge required. Just simple, instant global payments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/register" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
              >
                <span>Start Sending</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button className={`px-8 py-4 font-semibold text-lg transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'text-emerald-400 hover:text-emerald-300' 
                  : 'text-emerald-700 hover:text-emerald-600'
              }`}>
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Why Choose PayLink?
            </h2>
            <p className={`text-xl transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Built for the future of digital payments
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`text-center p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-blue-800' 
                : 'bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg'
            }`}>
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Global Reach
              </h3>
              <p className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Send USDC to anyone, anywhere in the world, instantly. No borders, no delays, no high fees.
              </p>
            </div>
            
            <div className={`text-center p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-green-900/50 to-emerald-900/50 border border-green-800' 
                : 'bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg'
            }`}>
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Secure & Trustless
              </h3>
              <p className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Built on blockchain technology with bank-level security. Your funds are always safe and verifiable.
              </p>
            </div>
            
            <div className={`text-center p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-orange-900/50 to-amber-900/50 border border-orange-800' 
                : 'bg-gradient-to-br from-orange-50 to-amber-50 hover:shadow-lg'
            }`}>
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Lightning Fast
              </h3>
              <p className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Transactions settle in seconds, not days. Experience the speed of modern digital payments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`py-20 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              How It Works
            </h2>
            <p className={`text-xl transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Simple steps to start using PayLink
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg transform transition-transform duration-300 hover:scale-110">
                1
              </div>
              <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Create Account
              </h3>
              <p className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Sign up with your email and we'll create a secure wallet for you automatically.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg transform transition-transform duration-300 hover:scale-110">
                2
              </div>
              <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Add Funds
              </h3>
              <p className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Top up your balance with USDC using our simple on-ramp integration.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg transform transition-transform duration-300 hover:scale-110">
                3
              </div>
              <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Send & Receive
              </h3>
              <p className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Send money to anyone using just their email address. It's that simple!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            
            <div>
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">$2M+</div>
              <div className="text-gray-600">Transactions Volume</div>
            </div>
            
            <div>
              <div className="flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Countries Supported</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className={`py-20 transition-all duration-500 ${
        theme === 'dark' 
          ? 'bg-gradient-to-r from-emerald-600 to-blue-600' 
          : 'bg-gradient-to-r from-emerald-500 to-emerald-700'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to revolutionize your payments?
          </h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-blue-100' : 'text-emerald-100'
          }`}>
            Join thousands of users who are already enjoying instant, global payments with PayLink.
          </p>
          <Link 
            to="/register" 
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center space-x-2 ${
              theme === 'dark' 
                ? 'bg-white hover:bg-gray-100 text-blue-600' 
                : 'bg-white hover:bg-gray-100 text-emerald-600'
            }`}
          >
            <span>Get Started Today</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <CreditCard className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
            <span className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
              PayLink
            </span>
          </div>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            &copy; 2025 PayLink. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;