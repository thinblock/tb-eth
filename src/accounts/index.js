const { createError } = require('micro-boom');
const Account = require('../models/account');

const getAccounts = async (req) => {
  const { decoded: { clientId } } = req;

  try {
    return await Account.find({ client_id: clientId });
  } catch (e) {
    throw createError(500, e);
  }
};

const createAccount = async (req) => {
  const { decoded: { clientId } } = req;
  try {
    const account = new Account({
      client_id: clientId,
      account_address: '',
      private_key: '',
    });
    await account.save();

    return account;
  } catch (e) {
    throw createError(500, e);
  }
};


module.exports = {
  createAccount,
  getAccounts,
};
