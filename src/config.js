const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = {
  initDB: async () => {
    const options = {
      autoIndex: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 10,
      bufferMaxEntries: 0,
    };
    try {
      await mongoose.connect(process.env.TB_ETH_DB_STRING, options);
      console.log('DB Connected!');
    } catch (e) {
      console.log('Error while connecting to DB.', e.message);
    }
  },
  disConnectDB: async () => {
    await mongoose.disconnect();
  },
};
