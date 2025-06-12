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

// Test the connection
pool
  .getConnection()
  .then((connection) => {
    console.log("Database connection established successfully")
    connection.release()
  })
  .catch((err) => {
    console.error("Error connecting to database:", err)
  })

export default pool
