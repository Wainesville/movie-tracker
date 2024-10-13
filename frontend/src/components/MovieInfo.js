import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieInfo, addToWatchlist } from '../api'; // Ensure you import both functions

function MovieInfo() {
  const { id } = useParams(); // Get the movie ID from the URL parameters
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const loadMovieInfo = async () => {
      const movieData = await fetchMovieInfo(id); // Fetch the movie data using the ID
      setMovie(movieData);
    };
    loadMovieInfo();
  }, [id]);

  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist(movie.id, movie.title, movie.poster_path);
      alert('Movie added to watchlist!');
    } catch (error) {
      alert('You must be logged in to add movies to your watchlist.');
    }
  };

  if (!movie) return <div>Loading...</div>; // Loading state

  return (
    <div className="movie-info">
      <h3>{movie.title}</h3>
      <p>{movie.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
    </div>
  );
}

export default MovieInfo;
