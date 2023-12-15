const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = async (query, params) => {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(query, params);
    connection.release();
    console.log("database connected");
    return rows;
  } catch (error) {
    console.error("Query Error: ", error);
    throw error;
  }
};
