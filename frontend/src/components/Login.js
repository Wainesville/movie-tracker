import React, { useState } from 'react';
import axios from 'axios';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a request to your backend login route
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Assume response contains the token and user info
      const { token, user } = response.data;

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Handle login state, pass the user info to parent
      handleLogin(user);
      
      // Optionally reset form
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit} className="w-50">
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
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
