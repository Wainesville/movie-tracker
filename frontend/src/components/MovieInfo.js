// src/components/MovieInfo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { addToWatchlist } from '../api';

const API_KEY = '8feb4db25b7185d740785fc6b6f0e850'; // Move your API_KEY here
const BASE_URL = 'https://api.themoviedb.org/3';

function MovieInfo({ isLoggedIn }) {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const movieId = window.location.pathname.split('/').pop(); // Extract movieId from the URL

  const handleAddToWatchlist = async () => {
    if (isLoggedIn) {
      const success = await addToWatchlist(movie.id);
      if (success) {
        alert('Movie added to watchlist!');
      } else {
        alert('Failed to add movie to watchlist.');
      }
    } else {
      alert('You need to log in to add movies to your watchlist.');
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
          params: { api_key: API_KEY },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to fetch movie details.');
      }
    };

    fetchMovie();
  }, [movieId]);

  if (error) {
    return <div>{error}</div>; // Show error message if fetching fails
  }

  if (!movie) {
    return <div>Loading movie information...</div>; // Show loading state while fetching
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
      {/* Display other movie details here */}
    </div>
  );
}

export default MovieInfo;



