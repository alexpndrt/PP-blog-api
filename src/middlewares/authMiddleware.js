import jwt from 'jsonwebtoken';

/**
 * Middleware pour vérifier si un token JWT est présent et valide
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant ou invalide' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalide ou expiré' });
    }

    req.user = user; // On stocke les infos du token dans req.user
    next();
  });
};

/**
 * Middleware pour vérifier les rôles autorisés
 * Exemple : authorizeRoles('admin')
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Accès interdit : rôle insuffisant' });
    }
    next();
  };
};
