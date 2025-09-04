// lib/test-db.js
require('dotenv').config({ path: '../.env.local' }); // load env from project root

const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...');

    // Create connection using env variables
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'school_db'
    });

    console.log('✅ Database connected successfully!');

    // Check if schools table exists
    const [rows] = await connection.execute('DESCRIBE schools');
    console.log('✅ Schools table exists with columns:', rows.map(r => r.Field));

    // Insert test record
    const [result] = await connection.execute(
      'INSERT INTO schools (name, address, city, state, contact, email_id) VALUES (?, ?, ?, ?, ?, ?)',
      ['Test School', '123 Test St', 'Test City', 'Test State', 9876543210, 'test@test.com']
    );
    console.log('✅ Test insert successful, ID:', result.insertId);

    // Clean up test record
    await connection.execute('DELETE FROM schools WHERE id = ?', [result.insertId]);
    console.log('✅ Test record cleaned up');

    await connection.end();
    console.log('🎉 All tests passed!');
    
  } catch (error) {
    console.error('❌ Database test failed:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);

    if (error.code === 'ECONNREFUSED') {
      console.log('\n🔧 Solution: Make sure MySQL is running in XAMPP');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n🔧 Solution: Check your DB_USER/DB_PASSWORD in .env.local (and use quotes if password has special characters)');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('\n🔧 Solution: Create the school_db database first');
    }
  }
}

testConnection();
