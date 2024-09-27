const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
  res.json({ message: 'API is working!' });  // Return JSON response instead of rendering a view
});

router.get('/profile', auth, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.user.userId });
});

module.exports = router;