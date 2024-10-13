import React, { useEffect, useState } from 'react';
import { fetchWatchlist, removeFromWatchlist } from '../api';
import './styles.css'; // Update the import to your consolidated CSS file

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const loadWatchlist = async () => {
      const movies = await fetchWatchlist();
      setWatchlist(movies);
    };
    loadWatchlist();
  }, []);

  const handleRemove = async (movieId) => {
    try {
      await removeFromWatchlist(movieId);
      setWatchlist(watchlist.filter((movie) => movie.movie_id !== movieId));
    } catch (error) {
      alert('Failed to remove movie from watchlist.');
    }
  };

  return (
    <div className="watchlist">
      <h2>Your Watchlist</h2>
      <div className="movie-grid">
        {watchlist.map((movie) => (
          <div key={movie.movie_id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <button onClick={() => handleRemove(movie.movie_id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
