const error = (err, req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'We were unable to process your request, please try again later.';

  return res.status(status).json({ message });
};

module.exports = error;