import React, { useEffect, useState } from 'react';
import { fetchGenres, fetchMoviesByGenre } from '../api';
import { useNavigate } from 'react-router-dom';
import './Browse.css';

function Browse() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genreMovies, setGenreMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGenres = async () => {
      const genreList = await fetchGenres();
      setGenres(genreList);
    };
    loadGenres();
  }, []);

  const handleGenreClick = async (genreId) => {
    setSelectedGenre(genreId);
    const results = await fetchMoviesByGenre(genreId);
    setGenreMovies(results);
  };

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="browse-page">
      <h2>Select a Genre</h2>
      <div className="genre-buttons">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className="genre-button"
          >
            {genre.name}
          </button>
        ))}
      </div>

      <div>
        {genreMovies.length > 0 && (
          <div>
            <h2>Movies in {genres.find((g) => g.id === parseInt(selectedGenre))?.name}</h2>
            <div className="movie-grid">
              {genreMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="movie-card"
                  onClick={() => navigate(`/movie/${movie.id}`)} // Navigate to MovieInfo
                >
                  <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Browse;
