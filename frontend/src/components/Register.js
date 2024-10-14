import React, { useState } from 'react';
import { registerUser } from '../api'; // Ensure this is the correct import for your API functions
import './styles.css'; // Ensure this imports your main styles
import MovieCollage from './MovieCollage'; // Import the MovieCollage component

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
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required // Make username required
            className="form-control" // Add form-control class for consistent styling
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required // Make email required
            className="form-control" // Add form-control class for consistent styling
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required // Make password required
            className="form-control" // Add form-control class for consistent styling
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display registration error */}
        <button type="submit" className="btn">Register</button>
      </form>
      <MovieCollage /> {/* Add the movie collage here */}
    </div>
  );
}

export default Register;
