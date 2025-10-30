// This file implements the authentication service.
// It makes an API call to a backend endpoint (e.g., a Vercel Serverless Function)
// which securely connects to the Neon database.
// The frontend **must not** connect directly to the database for security reasons.

/**
 * Calls the backend login API.
 * @param username The user's username.
 * @param password The user's password.
 * @returns A promise that resolves if credentials are valid.
 */
export const login = async (username: string, password: string): Promise<{ success: boolean }> => {
  // --- THIS IS THE REAL IMPLEMENTATION ---
  // This code calls a backend API endpoint at `/api/login`.
  // You must create this endpoint as a Vercel Serverless Function
  // for the login to work when deployed.
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      // The API should return a meaningful error message if login fails
      const errorData = await response.json();
      throw new Error(errorData.message || 'Invalid credentials');
    }
    
    // Assuming the API returns { success: true } on successful login
    return await response.json(); 
  } catch (error) {
    console.error('Login API call failed:', error);
    // This catch block will handle network errors or issues with the API endpoint.
    // Ensure your backend provides clear error messages.
    throw error;
  }

  // The backend Serverless Function (e.g., `/api/login.ts`) would handle the
  // secure database connection to Neon. It would look something like this:
  /*
  // Create a file at `/api/login.ts` in your project root (for Vercel).
  import { Pool } from 'pg';
 
  // The connection string is securely stored in Vercel environment variables.
  // Vercel automatically makes `process.env.NEON_DATABASE_URL` available here.
  const pool = new Pool({ connectionString: process.env.NEON_DATABASE_URL });

  export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
    
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
      // IMPORTANT: In a production app, always hash passwords using a library like `bcrypt`.
      // The query below is for demonstration only and is NOT secure for production.
      // A real query would look for the user and then compare the hashed password:
      // const query = 'SELECT password_hash FROM hotel_staff WHERE username = $1';
      // const { rows } = await pool.query(query, [username]);
      // if (rows.length === 0) {
      //   return res.status(401).json({ success: false, message: 'Invalid credentials' });
      // }
      // const isValid = await bcrypt.compare(password, rows[0].password_hash);
      
      const query = 'SELECT * FROM hotel_staff WHERE username = $1 AND password = $2'; // Unsafe, for demo only
      const { rows } = await pool.query(query, [username, password]);

      if (rows.length > 0) {
        // In a real app, you would typically create a session or a JWT (JSON Web Token) here
        // to keep the user logged in for subsequent requests.
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
};
