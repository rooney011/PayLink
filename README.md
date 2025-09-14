________________________________________
PayLink – Simple Global Payments with Stablecoins
________________________________________
PayLink is a web app that lets you send and receive stablecoin payments (USDC) as easily as sending an email or text message.
No long wallet addresses. No complicated setups. Just a familiar interface with the power of blockchain running in the background.
________________________________________
What You Can Do with PayLink

Sign Up & Get Started
•	Register with your email, and we’ll automatically create a secure blockchain wallet for you.
•	Log in to your dashboard and instantly see your balance.

Send & Receive Money
•	Pay anyone just by typing their email – no wallet addresses required.
•	Track every transaction with a clear, easy-to-read history.

Manage Your Balance
•	Top up INR → USDC (mocked): Pretend-buy USDC with INR for testing.
•	Withdraw USDC → INR (mocked): Pretend-sell USDC and withdraw to your “bank.”
•	Get a live mock conversion rate so balances feel real.

Payments Made Easy
•	Generate QR codes to receive payments on the go.
•	Works smoothly across mobile, tablet, and desktop.

For Admins
•	A dedicated dashboard to monitor users, transactions, and platform stats in real time.
________________________________________
How It Works Under the Hood
•	Frontend: React + Tailwind → clean, responsive, mobile-first UI.
•	Backend: Node.js + Express + MongoDB → secure APIs and authentication with JWT.
•	Blockchain: Ethers.js + Polygon Mumbai testnet → automatic wallet generation and stablecoin transfers.
•	Extras: QR code generation, mock fiat on-ramp/off-ramp, real-time updates.
________________________________________
Quick Start
1. Clone & Install
# Frontend
npm install

# Backend
cd server
npm install

2. Set Up Environment
PORT=5000
MONGODB_URI=mongodb://localhost:27017/paylink
JWT_SECRET=your_jwt_secret_here
POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com
USDC_CONTRACT_ADDRESS=0x0FA8781a83E46826621b3BC094Ea2A0212e71B23
PRIVATE_KEY_SEED=your_wallet_generation_seed

3. Run Locally
# Backend
cd server && npm run dev

# Frontend
npm run dev
•	App: http://localhost:5173
•	API: http://localhost:5000
________________________________________
Test Accounts

Admin
•	Email: admin@paylink.com
•	Password: admin123

User
•	Email: user@test.com
•	Password: test123
Or just sign up with your own account.
________________________________________
Why PayLink?
1.	Email, not addresses → Users don’t need to know blockchain jargon.
2.	Mock INR ↔ USDC → Simulates real-world on-ramps and off-ramps.
3.	Hackathon-ready → Built to showcase fintech + blockchain integration.
4.	Fully responsive → Works everywhere, from laptops to smartphones.
________________________________________
Security Built In
•	JWT-based authentication
•	Password hashing with bcrypt
•	Encrypted private key storage
•	Input validation and CORS protection
________________________________________
Designed for Everyone
•	Touch-friendly interface
•	Fast and lightweight
•	QR code support for quick payments
________________________________________
Why We Built This
We wanted to make global payments feel as simple as sending a text.
PayLink bridges the gap between traditional familiarity (emails, balances, history) and blockchain power (USDC, wallets, testnets).
It’s a hackathon project, but also a glimpse into how payments could work in the future: fast, borderless, and user-friendly.
________________________________________
PayLink – Making global payments as simple as sending an email 
________________________________________

