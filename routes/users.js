import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';

router.get('/', (req, res) => {
  res.json({ message: 'API is working!' });  // Return JSON response instead of rendering a view
});

router.get('/profile', auth, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId });
});

export default router;