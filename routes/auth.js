import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserSchema } from '../models/index.js';
import { validateMobileNumber, validateEmail, validatePassword } from '../utils/validation.js';

router.post('/register', async (req, res) => {
  try {
    const { mobileNumber, password, userName, email, addresses } = req.body;

    // Ensure that mobileNumber and password are provided
    if (!mobileNumber || !password) {
      return res.status(400).json({ message: 'Mobile number and password are required' });
    }

    if (!validateMobileNumber(mobileNumber)) {
      return res.status(400).json({ message: mobileValid.message });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ message: passwordValid.message });
    }

    if (!validateEmail(email) && !email) {
      return res.status(400).json({ message: emailValid.message });
    }

    const user = new UserSchema({ mobileNumber, password, email, userName, addresses });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;
    const user = await UserSchema.findOne({ mobileNumber });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 }); // 15 minutes
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days

    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

router.post('/refresh-token', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token not found' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 }); // 15 minutes
    res.json({ message: 'Access token refreshed' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid refresh token' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
});

export default router;