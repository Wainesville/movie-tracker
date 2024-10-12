// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Header() {
  return (
    <header className="header">
      <h1>Movie Tracker</h1>
      <nav>
        <ul>
          <li><Link to="/">Trending Movies</Link></li>
          <li><Link to="/upcoming-movies">Upcoming Movies</Link></li>
          <li><Link to="/watchlist">Watchlist</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/login">Login</Link></li> {/* Login link */}
          <li><Link to="/register">Register</Link></li> {/* Register link */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

