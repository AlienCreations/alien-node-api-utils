## Changelog

##### 1.0.4
- replace test reporter `istanbul` with `nyc`
- expose `withStatusCode` decorator
- create dedicated `CHANGELOG.md`

##### 1.0.3
- lock Ramda version

##### 1.0.2
- fix test coverage and update dependencies

##### 1.0.1
- update README to reflect new error signature

##### 1.0.0
- BREAKING CHANGE: `jsonResponseError` now requires `next`
- add fix for res.headersSent
- serialize errors in the response so that properties like 'stack' are included in the response

##### 0.1.3
- fix circular json in response

##### 0.1.2
- add support for missing req.flash

##### 0.1.1
- set node version to 6 in travis.yml for es6 support







