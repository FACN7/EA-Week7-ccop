const databaseConnection = require("../database/db_connection.js");

const signUp = (email, name, pass, cb) => {
  databaseConnection.query(
    "INSERT INTO users (email, name, password) VALUES ($1, $2, $3)",
    [email, name, pass],
    (err, res) => {
      if (err) {
        return cb(err);
      } else {
        cb(null, res);
      }
    }
  );
};

module.exports = signUp;
