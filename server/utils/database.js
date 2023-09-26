const mysql2 = require("mysql2");

const pool = mysql2.createPool({
  database: "clone_youtube",
  password: "12345678",
  host: "localhost",
  user: "root",
  port: 3306,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log("ket noi that bai");
  } else {
    console.log("ket noi thanh cong");
  }
});

module.exports = pool.promise();
