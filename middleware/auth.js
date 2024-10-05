import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log('Token Error:', error.message);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default auth;