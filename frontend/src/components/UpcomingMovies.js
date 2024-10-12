// src/components/UpcomingMovies.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUpcomingMovies } from '../api';

function UpcomingMovies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const upcomingMovies = await fetchUpcomingMovies();
        setMovies(upcomingMovies);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovies();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="upcoming-movies">
      <h2>Upcoming Movies</h2>
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

export default UpcomingMovies;


