const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, '2323d851378311cd9ad76aaf5cdfda6172072fd7f4ce2e461a20f1e350a70df71aa70c762c13e6e85b0ad79d710c3d7f23e56e95a751b6db4f4f2cfbb1c2da91');
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role && req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Access denied.' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
