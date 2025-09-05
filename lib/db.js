// lib/db.js
import mysql from 'mysql2/promise';

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT || 3306), // ✅ ensure it's a number
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      ssl: {
        // ✅ Railway requires SSL in many regions
        rejectUnauthorized: false,
      },
      waitForConnections: true,
      connectionLimit: 5,   // ✅ small pool for serverless
      queueLimit: 0,
    });
    console.log('✅ MySQL pool created');
  }
  return pool;
}
