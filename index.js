const { send } = require('micro');
const { router, get, post } = require('microrouter');

const config = require('./src/config');
const corsDecorator = require('./src/decorators/cors');
const authDecorator = require('./src/decorators/auth');
const accounts = require('./src/accounts');

// Initialises the DB
if (process.env.NODE_ENV !== 'test') {
  config.initDB();
}

const notfound = (req, res) => send(res, 404, 'Not found route');

module.exports = router(
  post('/eth/accounts', corsDecorator(authDecorator(accounts.createAccount))),
  get('/*', notfound),
);
