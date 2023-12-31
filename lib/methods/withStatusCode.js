const withStatusCode = ({ statusCode = 501, ...args }) => ({ err : args, statusCode });

module.exports = withStatusCode;