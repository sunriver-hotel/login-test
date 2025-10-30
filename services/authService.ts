// This file simulates an authentication service.
// In a real application deployed to Vercel with a Neon database, this function
// would make an API call to a backend endpoint (e.g., a Vercel Serverless Function).
// The frontend **must not** connect directly to the database for security reasons.

/**
 * Mocks a login request to a backend service that would connect to Neon.
 * @param username The user's username.
 * @param password The user's password.
 * @returns A promise that resolves if credentials are valid.
 */
export const login = (username: string, password: string): Promise<{ success: boolean }> => {
  // --- REAL IMPLEMENTATION GUIDANCE ---
  // In a real application, you would replace the setTimeout below with a `fetch` call
  // to your backend API, like this:
  /*
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      // The API should return a meaningful error message
      const errorData = await response.json();
      throw new Error(errorData.message || 'Invalid credentials');
    }
    
    // Assuming the API returns { success: true }
    return await response.json(); 
  } catch (error) {
    console.error('Login API call failed:', error);
    throw error;
  }
  */

  // The backend Serverless Function (e.g., `/api/login.ts`) would handle the
  // secure database connection to Neon. It would look something like this:
  /*
  // /api/login.ts (Vercel Serverless Function)
  import { Pool } from 'pg';
 
  // The connection string is securely stored in Vercel environment variables.
  // Never expose it on the frontend.
  const pool = new Pool({ connectionString: process.env.NEON_DATABASE_URL });

  export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
    const { username, password } = req.body;
    try {
      // IMPORTANT: In a production app, always hash passwords using a library like bcrypt.
      // This query is for demonstration only and is not secure.
      // A real query would be like:
      // const query = 'SELECT password_hash FROM hotel_staff WHERE username = $1';
      // const { rows } = await pool.query(query, [username]);
      // const isValid = await bcrypt.compare(password, rows[0].password_hash);
      const query = 'SELECT * FROM hotel_staff WHERE username = $1 AND password = $2'; // Unsafe, for demo only
      const { rows } = await pool.query(query, [username, password]);

      if (rows.length > 0) {
        // In a real app, you'd create a session or JWT here
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  */

  // For now, we use a mock validation to keep the frontend functional for development.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // This simulates a successful database lookup for 'admin' / 'password123'
      if (username === 'admin' && password === 'password123') {
        resolve({ success: true });
      } else {
        // This simulates a failed database lookup
        reject(new Error('Invalid credentials'));
      }
    }, 1500); // Simulate network delay of a real API call
  });
};
