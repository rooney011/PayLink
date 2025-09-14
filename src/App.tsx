import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocationProvider } from './contexts/LocationContext';
import { PremiumProvider } from './contexts/PremiumContext';
import { LoginPage, RegisterPage } from './components/AuthPages';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import TradingDashboard from './components/TradingDashboard';
import BlockchainTransparency from './components/BlockchainTransparency';
import PricingPage from './components/PricingPage';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="App">
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/trading" 
          element={
            <ProtectedRoute>
              <TradingDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/blockchain" 
          element={
            <ProtectedRoute>
              <BlockchainTransparency />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LocationProvider>
        <Router>
          <AuthProvider>
            <PremiumProvider>
              <AppContent />
            </PremiumProvider>
          </AuthProvider>
        </Router>
      </LocationProvider>
    </ThemeProvider>
  );
}

export default App;