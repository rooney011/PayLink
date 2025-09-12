import React, { useState, useEffect } from 'react';
import { Users, DollarSign, TrendingUp, Activity, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Transaction, User } from '../types';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const AdminDashboard: React.FC = () => {
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVolume: 0,
    totalTransactions: 0,
    activeUsers: 0
  });
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { token } = useAuth();

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [statsRes, usersRes, transactionsRes] = await Promise.all([
        axios.get(`${API_URL}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/admin/transactions`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      
      setStats(statsRes.data);
      setUsers(usersRes.data.users);
      setTransactions(transactionsRes.data.transactions);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Admin Dashboard
          </h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Monitor platform activity and user statistics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`rounded-2xl p-6 shadow-sm border transition-colors duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {stats.totalUsers}
                </p>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl p-6 shadow-sm border transition-colors duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Volume</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  ${stats.totalVolume.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl p-6 shadow-sm border transition-colors duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Transactions</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {stats.totalTransactions}
                </p>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl p-6 shadow-sm border transition-colors duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {stats.activeUsers}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className={`rounded-2xl shadow-sm border p-6 transition-colors duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Recent Users
            </h2>
            <div className="space-y-4">
              {users.slice(0, 5).map((user) => (
                <div key={user._id} className={`flex items-center justify-between p-4 rounded-xl transition-colors duration-200 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div>
                    <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {user.name}
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {user.email}
                    </div>
                    <div className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {formatAddress(user.walletAddress)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatDate(user.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className={`rounded-2xl shadow-sm border p-6 transition-colors duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Recent Transactions
            </h2>
            <div className="space-y-4">
              {transactions.slice(0, 5).map((transaction) => (
                <div key={transaction._id} className={`flex items-center justify-between p-4 rounded-xl transition-colors duration-200 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'sent' ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      {transaction.type === 'sent' ? 
                        <ArrowUpRight className={`h-5 w-5 ${transaction.type === 'sent' ? 'text-red-600' : 'text-green-600'}`} /> :
                        <ArrowDownLeft className={`h-5 w-5 ${transaction.type === 'sent' ? 'text-red-600' : 'text-green-600'}`} />
                      }
                    </div>
                    <div>
                      <div className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {transaction.fromEmail} → {transaction.toEmail}
                      </div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatDate(transaction.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      ${transaction.amount.toFixed(2)}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Transactions Table */}
        <div className={`rounded-2xl shadow-sm border p-6 mt-8 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            All Transactions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
                  <th className={`text-left py-3 px-4 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>From</th>
                  <th className={`text-left py-3 px-4 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>To</th>
                  <th className={`text-left py-3 px-4 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Amount</th>
                  <th className={`text-left py-3 px-4 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                  <th className={`text-left py-3 px-4 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction._id} className={`border-b transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'border-gray-700 hover:bg-gray-750' 
                      : 'border-gray-100 hover:bg-gray-50'
                  }`}>
                    <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                      {transaction.fromEmail}
                    </td>
                    <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                      {transaction.toEmail}
                    </td>
                    <td className={`py-3 px-4 font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className={`py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatDate(transaction.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;