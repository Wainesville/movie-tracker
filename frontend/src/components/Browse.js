import React, { useEffect, useState } from 'react';
import { fetchGenres, fetchMoviesByGenre } from '../api';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const ITEMS_PER_PAGE = 24;

function Browse() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genreMovies, setGenreMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
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
    setCurrentPage(1); // Reset to page 1 when a new genre is selected
    await loadMoviesByGenre(genreId, 1); // Load movies for the first page
  };

  const loadMoviesByGenre = async (genreId, page) => {
    const results = await fetchMoviesByGenre(genreId, page); // Pass the current page
    setGenreMovies(results);
  };

  const handleNextPage = async () => {
    const nextPage = currentPage + 1;
    await loadMoviesByGenre(selectedGenre, nextPage); // Load the next page
    setCurrentPage(nextPage); // Update the current page
  };

  const handlePrevPage = async () => {
    const prevPage = Math.max(currentPage - 1, 1); // Prevent going below 1
    await loadMoviesByGenre(selectedGenre, prevPage); // Load the previous page
    setCurrentPage(prevPage); // Update the current page
  };

  return (
    <div className="browse-page">
      <h2>Select a Genre</h2>
      <div className="browse-container">
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

      {genreMovies.length > 0 && (
        <div>
          <h2>Movies in {genres.find((g) => g.id === parseInt(selectedGenre))?.name}</h2>
          <div className="movie-grid">
            {genreMovies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <h3>{movie.title}</h3>
              </div>
            ))}
          </div>

          <div className="pagination">
            {currentPage > 1 && ( // Show Previous button only if not on the first page
              <button onClick={handlePrevPage}>Previous</button>
            )}
            <span>Page {currentPage}</span>
            {genreMovies.length === ITEMS_PER_PAGE && ( // Show Next button only if there are more movies to load
              <button onClick={handleNextPage}>Next</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Browse;
