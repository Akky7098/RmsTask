const User = require('../models/User');

async function adminAccess(req, res, next) {
  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin role required.' });
  }
}

async function managerAccess(req, res, next) {
  if (req.user.role === 'admin') {
    next();
  } else if (req.user.role === 'manager') {
    const userId = req.body.userId || req.params.userId;
    const user = await User.findById(userId);
    if (user && user.organizationId.equals(req.user.organizationId)) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Manager can only access their organization.' });
    }
  } else {
    res.status(403).json({ message: 'Access denied. Manager role required.' });
  }
}

async function userAccess(req, res, next) {
  if (req.user.role === 'admin') {
    next();
  } else if (req.user.role === 'manager') {
    const userId = req.body.userId || req.params.userId;
    const user = await User.findById(userId);
    if (user && user.organizationId.equals(req.user.organizationId)) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Manager can only access their organization.' });
    }
  } else if (req.user.role === 'user') {
    const userId = req.body.userId || req.params.userId;
    if (req.user.id === userId) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Users can only access their own tasks.' });
    }
  } else {
    res.status(403).json({ message: 'Access denied.' });
  }
}

module.exports = {
  adminAccess,
  managerAccess,
  userAccess,
};
