const databaseConnection = require("../database/db_connection.js");

const transactions = (email, cb) => {
  databaseConnection.query(
    `SELECT u.name,t.balance,t.descrip FROM users u JOIN transactions t ON u.email=t.email WHERE email=${email} ORDER BY date desc`,
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
