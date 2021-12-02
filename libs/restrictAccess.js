module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(400).send('<p>Access forbidden. No credentials provided</p>')
  }
  };