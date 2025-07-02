// handlers/errorHandlers.js

// Catch-all for unmatched routes
const notFoundHandler = () => {
  return (req, res, next) => {
    const error = new Error(`Cannot find ${req.originalUrl} on this server!`);
    error.statusCode = 404;
    next(error);
  };
};

// Global error handler
const globalErrorHandler = () => {
  return (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  };
};

module.exports = {
  notFoundHandler,
  globalErrorHandler,
};
