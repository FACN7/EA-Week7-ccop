const databaseConnection = require("../database/db_connection.js");

const addTransaction = (email,balance,descrip, cb) => {
  databaseConnection.query(
    `INSERT INTO transactions (email,balance,descrip) VALUES ($1,$2,$3)`,
    [email,balance,descrip],
    (err, res) => {
      if (err) {
        return cb(err);
      } else {
        cb(null, res);
      }
    }
  );
};

module.exports = addTransaction;
