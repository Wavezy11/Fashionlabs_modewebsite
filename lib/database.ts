import mysql from "mysql2/promise"

// Database configuratie
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "fashion_labs",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
}

// Maak een database connectie pool
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool
