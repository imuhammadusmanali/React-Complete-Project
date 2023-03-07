require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

module.exports = () => {
  let db = process.env.db;
  if (process.env.NODE_ENV === 'test') {
    db = process.env.TEST_DB;
  }

  mongoose
    .connect(db)
    .then(() => {
      console.log(`Connected to DB: ${db}`);
    })
    .catch((err) => {
      console.error('Could not connect to DB: ', err);
    });
};
