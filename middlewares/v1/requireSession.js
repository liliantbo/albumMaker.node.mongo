const requireSession = (req, res, next) => {
    if (req.session && req.session.user) {
      next();
    } else {
      return res.status(401).json({ code: 'NOT_AUTHORIZED', message: 'No ha iniciado sesión' });
    }
  };
  module.exports = requireSession;
  