require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('authToken');

  if (!token) return res.status(401).send('Access Denied: No Token Provided!');

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token!');
  }
};
