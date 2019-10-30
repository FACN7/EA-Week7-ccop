const databaseConnection = require("../database/db_connection.js");

const transactions = (email) => {
  return new Promise((res)=>{
    res(databaseConnection.query(`SELECT t.date,t.descrip,t.charge FROM users u JOIN transactions t ON u.email=t.email WHERE t.email=$1 ORDER BY t.trans_id desc`,
    [email]));
  })

};

// transactions("ebraheemabbas51@gmail.com6").then(data => console.log(data.rows)).catch(err => console.log(err.message));

module.exports = transactions;
