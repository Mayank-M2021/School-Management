// pages/api/schools/index.js
import { getPool } from '../../../lib/db';


export default async function handler(req, res) {
  try {
    const pool = getPool();

    if (req.method === 'GET') {
      // Fetch all schools
      const [rows] = await pool.query('SELECT * FROM schools');
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      // Insert a new school
      const { name, address, city, state, contact, email_id } = req.body;

      if (!name || !address || !city || !state || !contact || !email_id) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const [result] = await pool.execute(
        `INSERT INTO schools (name, address, city, state, contact, email_id)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, address, city, state, contact, email_id]
      );

      return res.status(201).json({ id: result.insertId });
    }

    // If not GET or POST
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ error: 'Database connection failed' });
  }
}
