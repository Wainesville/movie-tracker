import React, { useEffect, useState } from 'react';
import { fetchUpcomingMovies } from '../api'; // Ensure this import is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function UpcomingMovies() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const navigate = useNavigate(); // Create a navigate function

  useEffect(() => {
    const loadUpcomingMovies = async () => {
      const movies = await fetchUpcomingMovies();
      setUpcomingMovies(movies);
    };
    loadUpcomingMovies();
  }, []);

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for TMDb images

  return (
    <div className="movie-list">
      <h2>Upcoming Movies</h2>
      <ul>
        {upcomingMovies.map((movie) => (
          <li key={movie.id}>
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
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

export default UpcomingMovies;
