const jwt = require('jsonwebtoken');

const SECRET_KEY = 'abc1234';

function generateToken(user) {
  const payload = {
    id: user._id,
    username: user.username,
    role: user.role,
    organizationId: user.organizationId
  };
     const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '5d' });
     return token;
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = {
  generateToken,
  verifyToken,
};
