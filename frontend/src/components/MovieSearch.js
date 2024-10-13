import React, { useState } from 'react';
import { searchMovies } from '../api';
import { useNavigate } from 'react-router-dom';
import './MovieSearch.css';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      const results = await searchMovies(query);
      setMovies(results);
    }
  };

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="movie-search">
      <h2>Search for Movies</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {movies.length > 0 && (
          <div className="movie-grid">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                <h3>{movie.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieSearch;
