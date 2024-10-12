// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TrendingMovies from './components/TrendingMovies';
import UpcomingMovies from './components/UpcomingMovies';
import SearchPage from './components/SearchPage';
import Header from './components/Header';
import MovieInfo from './components/MovieInfo';
import Watchlist from './components/WatchList';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = async (movieId) => {
    if (!watchlist.find((m) => m.id === movieId)) {
      setWatchlist((prevWatchlist) => [...prevWatchlist, { id: movieId }]);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<TrendingMovies />} />
          <Route path="/upcoming-movies" element={<UpcomingMovies />} />
          <Route
            path="/movie/:movieId"
            element={<MovieInfo isLoggedIn={isLoggedIn} />}
          />
          <Route path="/watchlist" element={<Watchlist watchlist={watchlist} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




