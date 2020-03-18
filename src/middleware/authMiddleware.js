const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    // check header or url parameters or post parameters for token
    if (!req.headers.authorization) {
      return res.status(403).send('No token provided.');
    }

    const token = req.headers.authorization.split(' ')[1];

    // verifies secret and checks exp
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    return next();
  } catch (e) {
    return res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;
