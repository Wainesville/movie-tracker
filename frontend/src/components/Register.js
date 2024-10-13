import React, { useState } from 'react';
import { registerUser } from '../api'; // Ensure this is the correct import for your API functions

function Register() {
  const [username, setUsername] = useState(''); // State for username
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState(''); // State for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the registerUser function with username, email, and password
      await registerUser({ username, email, password });
      alert('Registration successful! You can log in now.');
      // Optionally reset the fields after successful registration
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      // Display an error message if registration fails
      setError('Registration failed. Please try again.'); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required // Make username required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required // Make email required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required // Make password required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display registration error */}
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;


