import createConnection from '../../../lib/db';

export default async function handler(req, res) {
  let connection;
  
  try {
    connection = await createConnection();

    if (req.method === 'GET') {
      const [rows] = await connection.execute('SELECT * FROM schools ORDER BY id DESC');
      res.status(200).json(rows);
      
    } else if (req.method === 'POST') {
      const { name, address, city, state, contact, email_id, image } = req.body;
      
      // Validate required fields
      if (!name || !address || !city || !state || !contact || !email_id) {
        return res.status(400).json({ error: 'All required fields must be provided' });
      }

      const [result] = await connection.execute(
        'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, address, city, state, contact, email_id, image || null]
      );
      
      res.status(201).json({ 
        success: true, 
        id: result.insertId,
        message: 'School added successfully' 
      });
      
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: 'Database operation failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}