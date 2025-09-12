# PayLink - Stablecoin Payment Platform

PayLink is a full-stack web application that enables users to send and receive stablecoin payments (USDC) using just an email address or phone number. Built with React, Node.js, and blockchain integration.

## 🚀 Features

### Frontend (React + Tailwind CSS)
- **Landing Page**: Beautiful, responsive landing page explaining instant global payments
- **Authentication**: Secure email/password registration and login system
- **Dashboard**: Intuitive interface showing:
  - USDC balance with show/hide functionality
  - Send payments using recipient's email
  - Transaction history with detailed status
  - Quick action buttons for all operations

### Backend (Node.js + Express)
- **User Authentication**: JWT-based secure authentication
- **Wallet Management**: Automatic wallet creation and email-to-address mapping
- **Payment Processing**: Send USDC between users via email addresses
- **Transaction History**: Complete audit trail of all payments

### Blockchain Integration
- **Testnet Support**: Built for Polygon Mumbai testnet
- **USDC Integration**: Native USDC test token support
- **Web3 Integration**: Using Ethers.js for smart contract interactions
- **Wallet Generation**: Automatic wallet creation for each user

### Mock On-Ramp/Off-Ramp
- **Top-up Balance**: Simulate buying USDC with INR
- **Withdraw to Bank**: Simulate selling USDC back to INR
- **Real-time Conversion**: Mock exchange rates for demo purposes

### Additional Features
- **Admin Dashboard**: Complete transaction and user monitoring
- **QR Code Payments**: Generate QR codes for easy payment receiving
- **Mobile Responsive**: Optimized for all device sizes
- **Real-time Updates**: Live balance and transaction updates

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, MongoDB, JWT Authentication
- **Blockchain**: Ethers.js, Polygon Mumbai Testnet, USDC Test Token
- **Additional**: QR Code generation, Responsive design, Admin controls

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for production) or mock database (for demo)

### Quick Start

1. **Clone and Install Dependencies**
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

2. **Environment Setup**
```bash
# Backend environment (server/.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/paylink
JWT_SECRET=your_jwt_secret_here
POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com
USDC_CONTRACT_ADDRESS=0x0FA8781a83E46826621b3BC094Ea2A0212e71B23
PRIVATE_KEY_SEED=your_wallet_generation_seed
```

3. **Start Development Servers**
```bash
# Start backend server (from server directory)
npm run dev

# Start frontend (from root directory)
npm run dev
```

4. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## 🧪 Demo Accounts

For testing purposes, use these pre-configured accounts:

**Admin Account:**
- Email: `admin@paylink.com`
- Password: `admin123`
- Features: Access to admin dashboard, higher demo balance

**Test User Account:**
- Email: `user@test.com`
- Password: `test123`
- Features: Standard user features, demo balance

**Or create your own account** through the registration process!

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration with wallet creation
- `POST /api/auth/login` - User authentication
- `GET /api/auth/me` - Get current user profile

### Wallet & Payments
- `GET /api/wallet/balance` - Get user's USDC balance
- `POST /api/wallet/topup` - Mock INR to USDC conversion
- `POST /api/wallet/withdraw` - Mock USDC to INR conversion
- `POST /api/payments/send` - Send USDC to another user

### Transactions & Admin
- `GET /api/transactions` - Get user's transaction history
- `GET /api/admin/stats` - Platform statistics (admin only)
- `GET /api/admin/users` - All users (admin only)
- `GET /api/admin/transactions` - All transactions (admin only)

## 🎯 Key Features Demonstration

### 1. Email-based Payments
Send USDC using just the recipient's email address - no complex wallet addresses needed!

### 2. Mock On-ramp/Off-ramp
- **Top-up**: Convert INR to USDC (simulated)
- **Withdraw**: Convert USDC to INR and transfer to bank account (simulated)

### 3. QR Code Payments
Generate QR codes containing payment information for easy mobile payments.

### 4. Admin Dashboard
Complete oversight of platform activity:
- User statistics and growth
- Transaction volume and trends
- Real-time transaction monitoring

### 5. Responsive Design
Fully responsive interface that works seamlessly across:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Production Deployment

For production deployment:

1. **Database**: Replace mock database with real MongoDB
2. **Blockchain**: Configure with actual Polygon mainnet or testnet
3. **Environment**: Update all environment variables for production
4. **Security**: Implement additional security measures for private key storage
5. **Scaling**: Add Redis for session management and caching

## 🛡 Security Features

- JWT-based authentication with secure token storage
- Password hashing using bcryptjs
- Private key encryption and secure storage
- Input validation and sanitization
- CORS protection for API endpoints

## 📱 Mobile Experience

PayLink is designed with mobile-first principles:
- Touch-friendly interface elements
- Optimized layouts for small screens
- Fast loading and minimal data usage
- QR code scanning capabilities

## 🤝 Contributing

This is a hackathon demo project showcasing modern fintech capabilities. The codebase demonstrates:

- Full-stack development best practices
- Blockchain integration patterns
- Responsive web design
- REST API development
- React state management
- Modern authentication flows

## 📄 License

This project is created for demonstration purposes. Feel free to use as reference for your own projects.

---

**PayLink** - Making global payments as simple as sending an email! 🌍💸