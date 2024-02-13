const debug = require('debug')('sensibd:errorHandler');
const ApiError = require('../../errors/ApiError');

// Middleware de Express pour la gestion d'erreur
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, _, res, next) => {
  debug('errorHandler', error);
  if (error instanceof ApiError) {
    if (process.env.NODE_ENV === 'development') {
      return res.status(error.status).json({ status: 'error', message: error.message, stack: error.stack });
    }
    return res.status(error.status).json({ status: 'error', message: error.message });
  }
  if (process.env.NODE_ENV === 'development') {
    return res.status(500).json({ status: 'error', message: error.message, stack: error.stack });
  }
  return res.status(500).json({ status: 'error', message: 'Internal server error ' });
};

module.exports = errorHandler;
