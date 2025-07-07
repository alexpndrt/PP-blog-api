export const errorHandler = (err, req, res, next) => {
  console.error('❌ Erreur :', err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erreur serveur';

  res.status(statusCode).json({
    error: message
  });
};
