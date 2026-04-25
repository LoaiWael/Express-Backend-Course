const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, nxt) => {
  // Check Role
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access Denied...');

  try {
    const decodedPayLoad = jwt.verify(token, config.get('jwtsecret'));
    if (!decodedPayLoad.isAdmin) return res.status(401).send('Access Denied...');
    nxt();
  }
  catch (err) {
    res.status(400).send('Invalid Token');
  }
}