import React, { createContext, useContext, useEffect, useState } from 'react';

interface LocationContextType {
  country: 'US' | 'IN' | null;
  currency: 'USD' | 'INR';
  setCountry: (country: 'US' | 'IN') => void;
  requestLocation: () => Promise<void>;
  loading: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [country, setCountryState] = useState<'US' | 'IN' | null>(() => {
    const saved = localStorage.getItem('userCountry');
    return (saved as 'US' | 'IN') || null;
  });
  const [loading, setLoading] = useState(false);

  const currency = country === 'US' ? 'USD' : 'INR';

  const setCountry = (newCountry: 'US' | 'IN') => {
    setCountryState(newCountry);
    localStorage.setItem('userCountry', newCountry);
  };

  const requestLocation = async () => {
    setLoading(true);
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          enableHighAccuracy: true
        });
      });

      // Mock location detection based on coordinates
      // In production, you'd use a proper geolocation service
      const { latitude, longitude } = position.coords;
      
      // Simple mock logic - in production use proper geolocation API
      let detectedCountry: 'US' | 'IN';
      if (latitude >= 8.4 && latitude <= 37.6 && longitude >= 68.7 && longitude <= 97.25) {
        detectedCountry = 'IN'; // India bounds
      } else {
        detectedCountry = 'US'; // Default to US
      }

      setCountry(detectedCountry);
    } catch (error) {
      console.error('Location detection failed:', error);
      // Default to US if location detection fails
      if (!country) {
        setCountry('US');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!country) {
      requestLocation();
    }
  }, []);

  return (
    <LocationContext.Provider value={{
      country,
      currency,
      setCountry,
      requestLocation,
      loading
    }}>
      {children}
    </LocationContext.Provider>
  );
};