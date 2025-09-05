import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testRailwayConnection() {
  let connection;
  
  try {
    console.log('🚀 Testing Railway MySQL connection...');
    console.log('Host:', process.env.MYSQL_HOST);
    console.log('Port:', process.env.MYSQL_PORT);
    console.log('Database:', process.env.MYSQL_DATABASE);
    
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      ssl: { rejectUnauthorized: false }
    });
    
    console.log('✅ Connected to Railway MySQL successfully!');
    
    // Test if schools table exists
    try {
      const [rows] = await connection.execute('DESCRIBE schools');
      console.log('✅ Schools table exists with columns:', rows.map(r => r.Field));
    } catch (error) {
      console.log('❌ Schools table does not exist. Creating it...');
      
      await connection.execute(`
        CREATE TABLE schools (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name TEXT NOT NULL,
          address TEXT NOT NULL,
          city TEXT NOT NULL,
          state TEXT NOT NULL,
          contact BIGINT NOT NULL,
          image TEXT,
          email_id TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      console.log('✅ Schools table created successfully!');
    }
    
    // Test insert
    const [result] = await connection.execute(
      'INSERT INTO schools (name, address, city, state, contact, email_id) VALUES (?, ?, ?, ?, ?, ?)',
      ['Test School Railway', '123 Railway St', 'Cloud City', 'Digital State', 9876543210, 'test@railway.com']
    );
    
    console.log('✅ Test record inserted with ID:', result.insertId);
    
    // Test select
    const [schools] = await connection.execute('SELECT * FROM schools WHERE id = ?', [result.insertId]);
    console.log('✅ Test record retrieved:', schools[0]);
    
    // Clean up test record
    await connection.execute('DELETE FROM schools WHERE id = ?', [result.insertId]);
    console.log('✅ Test record deleted');
    
    console.log('🎉 All tests passed! Railway database is ready.');
    
  } catch (error) {
    console.error('❌ Railway connection test failed:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testRailwayConnection();