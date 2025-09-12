import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, DollarSign, Users, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import TradingChart from './TradingChart';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface TradingStats {
  totalVolume: number;
  dailyChange: number;
  transactionCount: number;
  averageTransaction: number;
  monthlyGrowth: number;
  activeUsers: number;
}

const TradingDashboard: React.FC = () => {
  const { token } = useAuth();
  const { theme } = useTheme();
  const [stats, setStats] = useState<TradingStats>({
    totalVolume: 0,
    dailyChange: 0,
    transactionCount: 0,
    averageTransaction: 0,
    monthlyGrowth: 0,
    activeUsers: 0
  });
  const [timeframe, setTimeframe] = useState<'1D' | '7D' | '1M' | '3M' | '1Y'>('7D');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTradingData();
  }, [timeframe]);

  const fetchTradingData = async () => {
    try {
      // Simulate trading data - in production, this would come from your API
      const mockStats: TradingStats = {
        totalVolume: 125847.32,
        dailyChange: 12.5,
        transactionCount: 1247,
        averageTransaction: 101.02,
        monthlyGrowth: 23.8,
        activeUsers: 342
      };
      
      setStats(mockStats);
    } catch (error) {
      console.error('Error fetching trading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard: React.FC<{
    title: string;
    value: string;
    change: number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, change, icon, color }) => (
    <div className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
      theme === 'dark' 
        ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
        : 'bg-white border-gray-200 hover:bg-gray-50'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
        <div className={`flex items-center space-x-1 text-sm ${
          change >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {value}
      </div>
      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        {title}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Loading trading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Trading Dashboard
          </h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Real-time payment analytics and market insights
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Volume"
            value={`$${stats.totalVolume.toLocaleString()}`}
            change={stats.dailyChange}
            icon={<DollarSign className="h-6 w-6 text-white" />}
            color="bg-gradient-to-r from-emerald-500 to-emerald-600"
          />
          <StatCard
            title="Transactions"
            value={stats.transactionCount.toLocaleString()}
            change={15.2}
            icon={<Activity className="h-6 w-6 text-white" />}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <StatCard
            title="Avg Transaction"
            value={`$${stats.averageTransaction.toFixed(2)}`}
            change={-2.1}
            icon={<BarChart3 className="h-6 w-6 text-white" />}
            color="bg-gradient-to-r from-orange-500 to-orange-600"
          />
          <StatCard
            title="Active Users"
            value={stats.activeUsers.toLocaleString()}
            change={stats.monthlyGrowth}
            icon={<Users className="h-6 w-6 text-white" />}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
          />
        </div>

        {/* Chart Section */}
        <div className={`rounded-2xl border p-6 mb-8 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Payment Volume Trends
              </h2>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Transaction volume over time
              </p>
            </div>
            <div className="flex space-x-2 mt-4 sm:mt-0">
              {(['1D', '7D', '1M', '3M', '1Y'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    timeframe === period
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <TradingChart timeframe={timeframe} theme={theme} />
        </div>

        {/* Market Insights */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Transactions */}
          <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Recent High-Value Transactions
            </h3>
            <div className="space-y-4">
              {[
                { amount: 2500, type: 'Business Payment', time: '2 min ago', trend: 'up' },
                { amount: 1850, type: 'International Transfer', time: '5 min ago', trend: 'up' },
                { amount: 1200, type: 'Merchant Payment', time: '8 min ago', trend: 'down' },
                { amount: 980, type: 'P2P Transfer', time: '12 min ago', trend: 'up' },
              ].map((tx, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      tx.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        ${tx.amount.toLocaleString()}
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {tx.type}
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {tx.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Analysis */}
          <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Market Analysis
            </h3>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border-l-4 border-green-500 ${
                theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className={`font-medium ${theme === 'dark' ? 'text-green-400' : 'text-green-800'}`}>
                    Volume Surge
                  </span>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                  Transaction volume increased by 23% this week, indicating strong user adoption.
                </p>
              </div>
              
              <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${
                theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  <PieChart className="h-4 w-4 text-blue-600" />
                  <span className={`font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-800'}`}>
                    User Growth
                  </span>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                  New user registrations up 45% compared to last month.
                </p>
              </div>
              
              <div className={`p-4 rounded-lg border-l-4 border-orange-500 ${
                theme === 'dark' ? 'bg-orange-900/20' : 'bg-orange-50'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  <ArrowUpRight className="h-4 w-4 text-orange-600" />
                  <span className={`font-medium ${theme === 'dark' ? 'text-orange-400' : 'text-orange-800'}`}>
                    Peak Hours
                  </span>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>
                  Highest activity between 2-4 PM and 8-10 PM daily.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingDashboard;