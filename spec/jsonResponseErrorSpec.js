'use strict';

const R                 = require('ramda'),
      jsonResponseError = require('../lib/methods/jsonResponseError');

const mockReqWithSession = {
  session : {
    flash : {}
  },
  flash   : R.identity
};

const mockReqNoFlash = {
  session : {}
};

const mockReqNoSession = {
  flash : R.identity
};

const mockRes = {
  json   : R.identity,
  status : () => {
    return mockRes;
  },
  locals : {},
  set    : () => {
  },
  send   : R.identity

};

const FAKE_HTTP_STATUS_CODE_ERROR = 1337;

const FAKE_ERROR_RESPONSE         = {
        statusCode : FAKE_HTTP_STATUS_CODE_ERROR,
        foo        : 'bar'
      },
      FAKE_ERROR_RESPONSE_TRIMMED = {
        foo : 'bar'
      };

const EXPECTED_RESPONSE_DATA_NO_SESSION   = JSON.stringify({
        statusCode : FAKE_HTTP_STATUS_CODE_ERROR,
        flash      : {
          notice : [],
          error  : []
        },
        data       : FAKE_ERROR_RESPONSE_TRIMMED
      }),
      EXPECTED_RESPONSE_DATA_WITH_SESSION = JSON.stringify({
        statusCode : FAKE_HTTP_STATUS_CODE_ERROR,
        flash      : {
          notice : mockReqWithSession.flash('notice'),
          error  : mockReqWithSession.flash('error')
        },
        data       : FAKE_ERROR_RESPONSE_TRIMMED
      });

const FAKE_NEXT = jasmine.createSpy('next');

describe('makeJsonResponseError without session', () => {

  let response = {};

  beforeEach(() => {
    spyOn(mockRes, 'send');
    response = jsonResponseError(mockReqNoSession, mockRes, FAKE_NEXT, FAKE_ERROR_RESPONSE);
  });

  it('executes the mock res.send function', () => {
    expect(mockRes.send).toHaveBeenCalledWith(EXPECTED_RESPONSE_DATA_NO_SESSION);
  });

});

describe('makeJsonResponseError without flash', () => {

  let response = {};

  beforeEach(() => {
    spyOn(mockRes, 'send');
    response = jsonResponseError(mockReqNoFlash, mockRes, FAKE_NEXT, FAKE_ERROR_RESPONSE);
  });

  it('executes the mock res.send function', () => {
    expect(mockRes.send).toHaveBeenCalledWith(EXPECTED_RESPONSE_DATA_NO_SESSION);
  });

});

describe('makeJsonResponseError with session', () => {

  let response = {};

  beforeEach(() => {
    spyOn(mockRes, 'send');
    response = jsonResponseError(mockReqWithSession, mockRes, FAKE_NEXT, FAKE_ERROR_RESPONSE);
  });

  it('executes the mock res.send function', () => {
    expect(mockRes.send).toHaveBeenCalledWith(EXPECTED_RESPONSE_DATA_WITH_SESSION);
  });

});

describe('mockRes.send', () => {
  it('returns the value given', () => {
    expect(mockRes.send('foo')).toBe('foo');
  });
});

describe('mockReqWithSession.flash', () => {
  it('returns the value given', () => {
    expect(mockReqWithSession.flash('foo')).toBe('foo');
  });
});
