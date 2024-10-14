// src/components/UpcomingMovies.js
import React, { useEffect, useState } from 'react';
import { fetchUpcomingMovies } from '../api';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Ensure you're importing your consolidated CSS

const ITEMS_PER_PAGE = 24;

function UpcomingMovies() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUpcomingMovies = async () => {
      const movies = await fetchUpcomingMovies(currentPage); // Pass the current page
      setUpcomingMovies(movies);
    };
    loadUpcomingMovies();
  }, [currentPage]); // Depend on currentPage to load new movies when page changes

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)); // Prevent going below 1
  };

  // Calculate the current movies to display
  const indexOfLastMovie = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstMovie = indexOfLastMovie - ITEMS_PER_PAGE;
  const currentMovies = upcomingMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  return (
    <div>
      <h2>Upcoming Movies</h2>
      <div className="movie-grid">
        {currentMovies.map((movie) => (
          <div key={movie.id} className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(upcomingMovies.length / ITEMS_PER_PAGE)}>Next</button>
      </div>
    </div>
  );
}

export default UpcomingMovies;
