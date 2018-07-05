const { handleErrors, createError } = require('micro-boom');
const { to } = require('await-to-js');
const request = require('axios');
const User = require('../models/account');

module.exports = fn => handleErrors(async (req, res) => {
  const token = req.headers.Authorization || req.headers.authorization;
  if (!token) {
    throw createError(401, 'No Access Token was specified in the Request Headers');
  }

  try {
    const [ err, decodedToken ] = await to(request({}).get());
    
    if (err) {
      throw createError(500, err);
    }
    
    if (!decodedToken) {
      throw createError(401, 'Provided Access Token was invalid or expired');
    }
    req.decoded = { clientId: decodedToken.client_id };
    return fn(req, res);
  } catch (e) {
    throw createError(401, 'Provided Access Token was invalid or expired');
  }
}, true);
