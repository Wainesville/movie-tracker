// src/components/TrendingMovies.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTrendingMovies } from '../api';

function TrendingMovies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovies();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="trending-movies">
      <h2>Trending Movies</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TrendingMovies;

