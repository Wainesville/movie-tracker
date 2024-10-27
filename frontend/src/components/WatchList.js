import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchWatchlist, removeFromWatchlist } from '../api';
import axios from 'axios'; // Import axios for API requests
import './styles.css';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const movies = await fetchWatchlist();
        setWatchlist(movies);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
        alert('Failed to fetch watchlist. Please try again later.');
      }
    };

    const loadUserInfo = async () => {
      try {
        // Add "Authorization" header with the token if required
        const token = localStorage.getItem('token'); // Adjust according to your authentication logic
        const response = await axios.get('/api/user-info', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token for authentication
          },
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user info:', error);
        alert('Could not fetch user information. Please try again later.');
      }
    };

    loadWatchlist();
    loadUserInfo();
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
      <h3>Welcome, {username}</h3>
      <Link to="/user-info">Edit your profile</Link>
      <div className="movie-grid">
        {watchlist.map((movie) => (
          <div key={movie.movie_id} className="movie-card">
            <Link to={`/movie/${movie.movie_id}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster}`} alt={movie.title} />
              <h3>{movie.title}</h3>
            </Link>
            <button onClick={() => handleRemove(movie.movie_id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
