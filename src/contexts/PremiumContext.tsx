import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

interface PremiumContextType {
  isPremium: boolean;
  upgradeToPremium: () => Promise<void>;
  loading: boolean;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
};

export const PremiumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Check if user is premium (test account or has premium subscription)
  const isPremium = user?.email === 'premium@paylink.com' || user?.email === 'admin@paylink.com';

  const upgradeToPremium = async () => {
    setLoading(true);
    try {
      // Simulate premium upgrade process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, this would call your payment processor
      // For now, we'll show a success message
      alert('Premium upgrade successful! Please refresh the page to see premium features.');
    } catch (error) {
      console.error('Premium upgrade failed:', error);
      alert('Premium upgrade failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PremiumContext.Provider value={{
      isPremium,
      upgradeToPremium,
      loading
    }}>
      {children}
    </PremiumContext.Provider>
  );
};