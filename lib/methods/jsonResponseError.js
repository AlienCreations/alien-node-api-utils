'use strict';

const R = require('ramda');

const makeJsonResponseBody = require('./_makeJsonResponseBody'),
      setFlashData         = require('./_setFlashData');

const HTTP_STATUS_CODE_SERVER_ERROR = 500;

const stringify = require('json-stringify-safe');

const serializeError = require('serialize-error');

/**
 * Respond to the client with an unsuccessful JSON payload.
 * @param {Object} req
 * @param {Object} req.flash
 * @param {Object} res
 * @param {Object} err
 * @returns {*}
 */
const jsonResponseError = R.curry((req, res, next, err) => {
  if (res.headersSent) {
    return next(err);
  }
  const statusCode = R.propOr(HTTP_STATUS_CODE_SERVER_ERROR, 'statusCode', err);

  const response = R.mergeRight(R.apply(R.bind(makeJsonResponseBody, req), [statusCode, req.flash]), { 'data' : R.omit(['statusCode'], err) });

  if (req.flash) {
    setFlashData(res, response.flash);
  }

  res.set('Content-Type', 'application/json');
  return res.status(statusCode).send(stringify(serializeError(response)));
});

module.exports = jsonResponseError;
