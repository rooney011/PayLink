import React, { useState, useEffect } from 'react';
import { X, Copy, QrCode, CheckCircle } from 'lucide-react';
import QRCode from 'qrcode';

interface ReceivePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

const ReceivePaymentModal: React.FC<ReceivePaymentModalProps> = ({ isOpen, onClose, userEmail }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      generateQRCode();
    }
  }, [isOpen, userEmail]);

  const generateQRCode = async () => {
    try {
      const paymentData = {
        type: 'paylink_payment',
        recipient: userEmail,
        message: `Send USDC to ${userEmail}`
      };
      const qrData = JSON.stringify(userEmail);
      const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        width: 256,
        margin: 2,
        color: {
          dark: '#1F2937',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrCodeDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(userEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Receive Payment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="text-center space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
            <div className="bg-white p-4 rounded-xl shadow-sm inline-block">
              {qrCodeUrl && (
                <img src={qrCodeUrl} alt="Payment QR Code" className="mx-auto" />
              )}
            </div>
          </div>

          <div>
            <p className="text-gray-600 mb-4">
              Share your email or show this QR code to receive payments
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-gray-700 break-all">{userEmail}</span>
                <button
                  onClick={copyEmail}
                  className="ml-3 flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-emerald-800">
              <QrCode className="h-5 w-5" />
              <span className="font-medium">How it works</span>
            </div>
            <p className="text-emerald-700 text-sm mt-2">
              Anyone can send you USDC by entering your email address in their PayLink app, 
              or by scanning your QR code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivePaymentModal;