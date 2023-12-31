'use strict';

const R = require('ramda');

/**
 * Make a common JSON response body for either success or error.
 * The `data` property will be merged into this object by the respective
 * jsonResponseSuccess or jsonResponseError method.
 *
 *
 * DO NOT REFACTOR THIS TO const _makeJsonResponseBody = (statusCode, flash) => {...}
 * YOU WILL LOSE THE CONTEXT OF `this` which is used by the express flash library
 *
 *
 * @param {Number} statusCode
 * @param {Function} flash
 * @returns {{statusCode: Number, flash: {notice: *, error: *}}}
 * @see jsonResponseSuccess
 * @see jsonResponseError
 * @private
 */
function _makeJsonResponseBody (statusCode, flash) {
  const hasSession = !!R.path(['session', 'flash'], this);

  return {
    statusCode : statusCode,
    flash      : {
      notice : hasSession ? flash.apply(this, ['notice']) : [],
      error  : hasSession ? flash.apply(this, ['error'])  : []
    }
  };
}

module.exports = _makeJsonResponseBody;
