import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../api';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Ensure you're importing your consolidated CSS

const ITEMS_PER_PAGE = 24;

function TrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTrendingMovies = async () => {
      const movies = await fetchTrendingMovies(); // Assume this fetches all 200 movies
      setTrendingMovies(movies);
    };
    loadTrendingMovies();
  }, []);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(trendingMovies.length / ITEMS_PER_PAGE)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Calculate the current movies to display
  const indexOfLastMovie = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstMovie = indexOfLastMovie - ITEMS_PER_PAGE;
  const currentMovies = trendingMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  return (
    <div>
      <h2>Trending Movies</h2>
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
        <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(trendingMovies.length / ITEMS_PER_PAGE)}>Next</button>
      </div>
    </div>
  );
}

export default TrendingMovies;
