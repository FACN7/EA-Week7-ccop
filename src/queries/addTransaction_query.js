const databaseConnection = require("../database/db_connection.js");

const addTransaction = (email,charge,descrip, cb) => {
  databaseConnection.query(
    `INSERT INTO transactions (email,charge,descrip) VALUES ($1,$2,$3)`,
    [email,charge,descrip],
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
