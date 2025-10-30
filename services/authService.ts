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
  // This code calls the backend API endpoint at `/api/login`.
  // You must create this endpoint as a Vercel Serverless Function
  // (using the code provided separately) for the login to work when deployed.
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      // The API should return a meaningful error message if login fails
      // We are using the message from the backend JSON response.
      const errorData = await response.json();
      throw new Error(errorData.message || 'Invalid username or password');
    }
    
    // The API returns { success: true } on successful login
    return await response.json(); 
  } catch (error) {
    console.error('Login API call failed:', error);
    // This catch block will handle network errors or issues with the API endpoint.
    // The error message thrown will be displayed to the user.
    throw error;
  }
};