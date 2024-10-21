import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use navigate hook for redirection
import axios from 'axios';
import './styles.css';
import MovieCollage from './MovieCollage';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, user } = response.data; // Assuming user object contains id
  
      // Store the token and user ID in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user.id); // Store user ID
  
      // Call the handleLogin function with the user object
      handleLogin(user);
      setEmail('');
      setPassword('');
  
      // Redirect to the watchlist page after successful login
      navigate('/watchlist');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };
  

  return (
    <div className="login-page">
      <MovieCollage />
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
