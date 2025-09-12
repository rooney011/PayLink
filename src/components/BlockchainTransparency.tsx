import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, Clock, Hash, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface BlockData {
  id: string;
  timestamp: string;
  transactionCount: number;
  hash: string;
  previousHash: string;
  merkleRoot: string;
  status: 'confirmed' | 'pending' | 'failed';
  size: number;
  gasUsed: number;
  validator: string;
}

const BlockchainTransparency: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<BlockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending'>('all');

  useEffect(() => {
    generateMockBlocks();
  }, []);

  const generateMockBlocks = () => {
    const mockBlocks: BlockData[] = [];
    for (let i = 0; i < 20; i++) {
      const timestamp = new Date(Date.now() - i * 300000).toISOString(); // 5 min intervals
      mockBlocks.push({
        id: `block_${20 - i}`,
        timestamp,
        transactionCount: Math.floor(Math.random() * 50) + 1,
        hash: `0x${Math.random().toString(16).substring(2, 66)}`,
        previousHash: i === 0 ? '0x0000000000000000000000000000000000000000000000000000000000000000' : `0x${Math.random().toString(16).substring(2, 66)}`,
        merkleRoot: `0x${Math.random().toString(16).substring(2, 66)}`,
        status: Math.random() > 0.1 ? 'confirmed' : Math.random() > 0.5 ? 'pending' : 'failed',
        size: Math.floor(Math.random() * 1000) + 500,
        gasUsed: Math.floor(Math.random() * 100000) + 21000,
        validator: `validator_${Math.floor(Math.random() * 10) + 1}`
      });
    }
    setBlocks(mockBlocks);
    setLoading(false);
  };

  const formatHash = (hash: string) => `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const filteredBlocks = blocks.filter(block => 
    filter === 'all' || block.status === filter
  );

  const BlockCard: React.FC<{ block: BlockData }> = ({ block }) => (
    <div 
      className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-lg ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
          : 'bg-white border-gray-200 hover:bg-gray-50'
      } ${selectedBlock?.id === block.id ? 'ring-2 ring-emerald-500' : ''}`}
      onClick={() => setSelectedBlock(block)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            block.status === 'confirmed' ? 'bg-green-100 text-green-600' :
            block.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
            'bg-red-100 text-red-600'
          }`}>
            {block.status === 'confirmed' ? <CheckCircle className="h-5 w-5" /> :
             block.status === 'pending' ? <Clock className="h-5 w-5" /> :
             <AlertCircle className="h-5 w-5" />}
          </div>
          <div>
            <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Block #{block.id.split('_')[1]}
            </div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {formatTime(block.timestamp)}
            </div>
          </div>
        </div>
        <div className={`text-sm px-3 py-1 rounded-full ${
          block.status === 'confirmed' ? 'bg-green-100 text-green-800' :
          block.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {block.status}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Transactions
          </div>
          <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            {block.transactionCount}
          </div>
        </div>
        <div>
          <div className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Size
          </div>
          <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            {block.size} bytes
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Hash: {formatHash(block.hash)}
        </div>
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
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Loading blockchain data...</p>
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
          <div className="flex items-center space-x-3 mb-4">
            <Shield className={`h-8 w-8 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Blockchain Transparency
            </h1>
          </div>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Immutable transaction records secured by blockchain technology
          </p>
        </div>

        {/* Security Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className={`p-6 rounded-2xl border ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Lock className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Immutable Records
              </h3>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              All transactions are cryptographically secured and cannot be altered once confirmed.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Full Transparency
              </h3>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              View all transaction blocks while maintaining user privacy through anonymization.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Hash className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Cryptographic Proof
              </h3>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Each block contains cryptographic hashes that verify data integrity.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Block List */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl border p-6 ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Recent Blocks
                </h2>
                <div className="flex space-x-2 mt-4 sm:mt-0">
                  {(['all', 'confirmed', 'pending'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                        filter === status
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : theme === 'dark'
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredBlocks.map((block) => (
                  <BlockCard key={block.id} block={block} />
                ))}
              </div>
            </div>
          </div>

          {/* Block Details */}
          <div className={`rounded-2xl border p-6 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Block Details
            </h2>
            
            {selectedBlock ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Block #{selectedBlock.id.split('_')[1]}
                    </span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      selectedBlock.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      selectedBlock.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedBlock.status}
                    </span>
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {formatTime(selectedBlock.timestamp)}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Block Hash
                    </div>
                    <div className={`text-xs font-mono p-2 rounded bg-gray-100 dark:bg-gray-700 break-all ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {selectedBlock.hash}
                    </div>
                  </div>

                  <div>
                    <div className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Previous Hash
                    </div>
                    <div className={`text-xs font-mono p-2 rounded bg-gray-100 dark:bg-gray-700 break-all ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {selectedBlock.previousHash}
                    </div>
                  </div>

                  <div>
                    <div className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Merkle Root
                    </div>
                    <div className={`text-xs font-mono p-2 rounded bg-gray-100 dark:bg-gray-700 break-all ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {selectedBlock.merkleRoot}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Transactions
                      </div>
                      <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {selectedBlock.transactionCount}
                      </div>
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Size
                      </div>
                      <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {selectedBlock.size}B
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Gas Used
                    </div>
                    <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {selectedBlock.gasUsed.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Validator
                    </div>
                    <div className={`text-sm font-mono ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {selectedBlock.validator}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <Hash className={`h-8 w-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Select a block to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainTransparency;