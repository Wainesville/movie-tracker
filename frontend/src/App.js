import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import Header from './components/Header';
import Login from './components/Login';
import MovieInfo from './components/MovieInfo';
import Register from './components/Register';
import MovieSearch from './components/MovieSearch';
import Browse from './components/Browse';
import Watchlist from './components/WatchList';
import TrendingMovies from './components/TrendingMovies';
import UpcomingMovies from './components/UpcomingMovies';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for token in localStorage to set initial login state
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    localStorage.setItem('token', user.token); // Store the actual token after login
    // Redirect to a different page if desired, e.g., watchlist
    // Navigate('/watchlist'); (use a navigation hook or set up redirection)
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Login handleLogin={handleLogin} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protect routes that require authentication */}
          <Route path="/movie/:id" element={isLoggedIn ? <MovieInfo /> : <Navigate to="/login" />} />
          <Route path="/search" element={isLoggedIn ? <MovieSearch /> : <Navigate to="/login" />} />
          <Route path="/browse" element={isLoggedIn ? <Browse /> : <Navigate to="/login" />} />
          <Route path="/watchlist" element={isLoggedIn ? <Watchlist /> : <Navigate to="/login" />} />
          <Route path="/trending" element={isLoggedIn ? <TrendingMovies /> : <Navigate to="/login" />} />
          <Route path="/upcoming" element={isLoggedIn ? <UpcomingMovies /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
