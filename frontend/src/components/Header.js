import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, handleLogout, username }) {
  return (
    <header>
      <h1>Movie Tracker</h1>
      <nav>
        <ul>
          {!isLoggedIn ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/browse">Browse</Link></li>
              <li><Link to="/watchlist">Watchlist</Link></li>
              <li><Link to="/homepage">Reviews</Link></li>
              <li><Link to="/trending">Trending Movies</Link></li>
              <li><Link to="/upcoming">Upcoming Movies</Link></li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
              <li>{username}</li> {/* Display the username */}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
