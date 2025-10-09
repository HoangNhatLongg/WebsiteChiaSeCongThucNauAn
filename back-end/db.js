const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "BanOto",
});

db.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối database:", err);
  } else {
    console.log("Kết nối database thành công!");
  }
});

module.exports = db;
