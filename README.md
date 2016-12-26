# Books API
[![Build Status](https://travis-ci.org/mshmeirelles/nodejs-tdd-api.svg?branch=master)](https://travis-ci.org/mshmeirelles/nodejs-tdd-api)
[![Coverage Status](https://coveralls.io/repos/github/mshmeirelles/nodejs-tdd-api/badge.svg?branch=master)](https://coveralls.io/github/mshmeirelles/nodejs-tdd-api?branch=master)

This is an application that returns a list of books, created to apply the best practices of TDD using Node JS, like unit tests, integration tests and contract tests. Libs used: Express, Mocha, Chai and Supertest; implemented using ES6 + Babel.

## How to develop

1. Clone repository.
2. Install dependencies.
3. Run tests.
4. Run ESlint.

```console
git clone git@github.com:mshmeirelles/nodejs-tdd-api.git books-api
cd books-api
npm install
npm run test-integration
npm run test-unit
npm run lint
```
