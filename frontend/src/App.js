import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

  const handleLogin = () => setIsLoggedIn(true);
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
          <Route path="/movie/:id" element={<MovieInfo />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<MovieSearch />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/trending" element={<TrendingMovies />} />
          <Route path="/upcoming" element={<UpcomingMovies />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
