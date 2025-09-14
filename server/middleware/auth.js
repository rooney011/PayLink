import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.error('Auth Error: No token provided');
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      console.error('Auth Error: Token decoded but no userId', decoded);
      return res.status(403).json({ message: 'Invalid token payload' });
    }
    const user = await User.findById(decoded.userId).select('-password -privateKey');
    if (!user) {
      console.error('Auth Error: User not found for userId', decoded.userId);
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth Error: Token verification failed', error);
    return res.status(403).json({ message: 'Invalid or expired token', error: error.message });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user.email !== 'admin@paylink.com') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};