import React, { useState } from 'react';
import { X, Download, Copy, CheckCircle, FileText } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation } from '../contexts/LocationContext';
import { Invoice } from '../types';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose, invoice }) => {
  const { theme } = useTheme();
  const { currency } = useLocation();
  const [copied, setCopied] = useState(false);

  const currencySymbol = currency === 'USD' ? '$' : '₹';

  const copyInvoiceId = async () => {
    try {
      await navigator.clipboard.writeText(invoice.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy invoice ID:', error);
    }
  };

  const downloadInvoice = () => {
    // Generate invoice content
    const invoiceContent = `
PAYLINK INVOICE
================

Invoice ID: ${invoice.id}
Date: ${new Date(invoice.createdAt).toLocaleDateString()}
Status: ${invoice.status.toUpperCase()}

FROM: ${invoice.fromEmail}
TO: ${invoice.toEmail}

TRANSACTION DETAILS:
Amount: ${currencySymbol}${invoice.amount.toFixed(2)}
Processing Fee: ${currencySymbol}${invoice.fee.toFixed(2)}
Total: ${currencySymbol}(${invoice.amount + invoice.fee}).toFixed(2)}

Transaction ID: ${invoice.transactionId}

Thank you for using PayLink!
    `;

    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PayLink_Invoice_${invoice.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`max-w-2xl w-full rounded-2xl shadow-xl transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <FileText className={`h-6 w-6 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Invoice Details
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className={`transition-colors ${
              theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Invoice Content */}
        <div className="p-6">
          {/* Invoice Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                PayLink Invoice
              </h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                {new Date(invoice.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Invoice ID:
                </span>
                <code className={`px-2 py-1 rounded text-sm font-mono ${
                  theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>
                  {invoice.id}
                </code>
                <button
                  onClick={copyInvoiceId}
                  className={`transition-colors ${
                    theme === 'dark' ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-emerald-600'
                  }`}
                >
                  {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                invoice.status === 'paid' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
                {invoice.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                From
              </h4>
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {invoice.fromEmail}
                </p>
              </div>
            </div>
            <div>
              <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                To
              </h4>
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {invoice.toEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Amount Breakdown */}
          <div className={`p-6 rounded-lg mb-6 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h4 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Amount Breakdown
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Transaction Amount:
                </span>
                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {currencySymbol}{invoice.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Processing Fee:
                </span>
                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {currencySymbol}{invoice.fee.toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-3 border-gray-300 dark:border-gray-600">
                <div className="flex justify-between">
                  <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Total Amount:
                  </span>
                  <span className={`font-bold text-lg ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {currencySymbol}{(invoice.amount + invoice.fee).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction ID */}
          <div className="mb-6">
            <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Transaction ID
            </h4>
            <code className={`block p-3 rounded-lg font-mono text-sm break-all ${
              theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}>
              {invoice.transactionId}
            </code>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <button
              onClick={downloadInvoice}
              className="flex-1 flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>Download Invoice</span>
            </button>
            <button
              onClick={copyInvoiceId}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              <span>{copied ? 'Copied!' : 'Copy ID'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;