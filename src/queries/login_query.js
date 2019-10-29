const databaseConnection = require("../database/db_connection.js");

const login = (email, cb) => {
  databaseConnection.query(
    `SELECT name,password FROM users WHERE email=$1`,[email],
    (err, res) => {
      if (err) {
        return cb(err);
      } else {
        cb(null, res);
      }
    }
  );
};

module.exports = login;
