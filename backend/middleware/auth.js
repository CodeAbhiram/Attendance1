const jwt = require('jsonwebtoken');

/**
 * Auth middleware - verifies JWT and attaches user payload to req.user
 * Works with tokens sent either in the `x-auth-token` header or the
 * standard `Authorization: Bearer <token>` header.
 */
function auth(req, res, next) {
  // Support both common header locations
  const authHeader = req.header('Authorization') || req.header('authorization');
  const tokenFromAuth = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  const token = req.header('x-auth-token') || tokenFromAuth;

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Expect the token payload to contain { user: { id, role, ... } }
    req.user = decoded.user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
}

/**
 * isFaculty middleware - ensures the authenticated user has faculty role
 */
function isFaculty(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  if (req.user.role !== 'faculty') {
    return res.status(403).json({ message: 'Access denied: faculty only' });
  }
  return next();
}

// Export the auth function as the default (module.exports) and also as
// named properties so both import styles in the codebase are supported:
// - const authMiddleware = require('../middleware/auth'); // uses default
// - const { auth, isFaculty } = require('../middleware/auth'); // uses named
module.exports = auth;
module.exports.auth = auth;
module.exports.isFaculty = isFaculty;
