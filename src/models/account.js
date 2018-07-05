const mongoose = require('mongoose');

const { Schema } = mongoose;

const AccountsSchema = new Schema({
  account_address: { type: String, unique: true, required: true },
  private_key: { type: String, required: true }, // For dev purposes only
  client_id: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, { collection: 'eth_accounts' });

module.exports = mongoose.model('eth_accounts', AccountsSchema);
