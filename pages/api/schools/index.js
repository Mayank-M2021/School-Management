import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM schools ORDER BY id DESC');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to fetch schools' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, address, city, state, contact, email_id, image } = req.body;

      console.log("Incoming data:", req.body); // 👀 debug

      const [result] = await pool.query(
        'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, address, city, state, contact, email_id, image]
      );

      res.status(201).json({
        success: true,
        id: result.insertId,
        message: 'School added successfully'
      });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to add school' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
