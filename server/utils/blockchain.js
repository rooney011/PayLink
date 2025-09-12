import { ethers } from 'ethers';
import crypto from 'crypto';
import dotenv from "dotenv";

dotenv.config();

// USDC ABI (minimal - just transfer and balanceOf)
const USDC_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function decimals() view returns (uint8)'
];

export class BlockchainService {
  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
    this.usdcContract = new ethers.Contract(
      process.env.USDC_CONTRACT_ADDRESS,
      USDC_ABI,
      this.provider
    );
    console.log("POLYGON_RPC_URL:", process.env.POLYGON_RPC_URL);
    console.log("USDC_CONTRACT_ADDRESS:", process.env.USDC_CONTRACT_ADDRESS);
  }

  generateWallet(seed) {
    const hash = crypto.createHash('sha256').update(seed).digest('hex');
    const wallet = new ethers.Wallet(hash, this.provider);
    return {
      address: wallet.address,
      privateKey: wallet.privateKey
    };
  }

  async getUSDCBalance(address) {
    try {
      // For demo purposes, return mock balance
      // In production, uncomment the real blockchain call:
      const balance = await this.usdcContract.balanceOf(address);
      const decimals = await this.usdcContract.decimals();
      return parseFloat(ethers.formatUnits(balance, decimals));
      
      // Mock balance for demo
      return Math.random() * 1000;
    } catch (error) {
      console.error('Error fetching USDC balance:', error);
      return 0;
    }
  }

  async sendUSDC(fromPrivateKey, toAddress, amount) {
    try {
      // For demo purposes, simulate transaction
      // In production, uncomment the real blockchain transaction:
      
      const wallet = new ethers.Wallet(fromPrivateKey, this.provider);
      const contractWithSigner = this.usdcContract.connect(wallet);
      const decimals = await this.usdcContract.decimals();
      const amountInWei = ethers.parseUnits(amount.toString(), decimals);
      
      const tx = await contractWithSigner.transfer(toAddress, amountInWei);
      await tx.wait();
      
      return tx.hash;
      
      
      // Mock transaction hash for demo
      return '0x' + crypto.randomBytes(32).toString('hex');
    } catch (error) {
      console.error('Error sending USDC:', error);
      throw error;
    }
  }
}

export default new BlockchainService();