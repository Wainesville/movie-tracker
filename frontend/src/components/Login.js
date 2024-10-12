// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
      navigate('/watchlist'); // Redirect after login
    } else {
      alert('Please fill in both fields.');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
