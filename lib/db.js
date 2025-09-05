import mysql from 'mysql2/promise';

let connection;

const createConnection = async () => {
  try {
    if (connection) {
      return connection;
    }

    // Railway MySQL connection
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT || 3306,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      ssl: {
        rejectUnauthorized: false
      },
      connectTimeout: 60000,
      acquireTimeout: 60000,
      timeout: 60000,
    });

    console.log('✅ Connected to Railway MySQL database');
    return connection;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

export default createConnection;