const databaseConnection = require("../database/db_connection.js");

const transactions = (email, cb) => {
  databaseConnection.query(
    `SELECT u.name,t.balance,t.descrip,t.date FROM users u JOIN transactions t ON u.email=t.email WHERE t.email=$1 ORDER BY t.trans_id desc`,
    [email],
    (err, res) => {
      if (err) {
        return cb(err);
      } else {
        cb(null, res);
      }
    }
  );
};

module.exports = transactions;
