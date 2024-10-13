import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../api'; // Ensure this import is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function TrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const navigate = useNavigate(); // Create a navigate function

  useEffect(() => {
    const loadTrendingMovies = async () => {
      const movies = await fetchTrendingMovies();
      setTrendingMovies(movies);
    };
    loadTrendingMovies();
  }, []);

  return (
    <div className="movie-list">
      <h2>Trending Movies</h2>
      <ul>
        {trendingMovies.map((movie) => (
          <li key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              onClick={() => navigate(`/movie/${movie.id}`)} // Navigate to MovieInfo on click
              style={{ cursor: 'pointer', width: '200px', height: 'auto' }} // Optional: Adjust size and cursor
            />
            <h3>{movie.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrendingMovies;
