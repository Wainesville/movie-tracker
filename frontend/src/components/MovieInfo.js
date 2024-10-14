import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieInfo, addToWatchlist, fetchMovieVideos } from '../api'; // Ensure you import both functions
import './styles.css'; // Import the CSS file for styles

function MovieInfo() {
  const { id } = useParams(); // Get the movie ID from the URL parameters
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState('');

  useEffect(() => {
    const loadMovieInfo = async () => {
      const movieData = await fetchMovieInfo(id); // Fetch the movie data using the ID
      setMovie(movieData);

      // Fetch the movie videos to get the trailer
      const videos = await fetchMovieVideos(id);
      const trailer = videos.find(video => video.type === 'Trailer'); // Find the trailer video
      if (trailer) {
        setTrailerKey(trailer.key); // Set the trailer key if available
      }
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

  // Extract necessary information
  const director = movie.credits.crew.find((member) => member.job === 'Director');
  const topActors = movie.credits.cast.slice(0, 5); // Top five actors
  const ageGuide = movie.adult ? '18+' : 'PG-13'; // Adjust based on the adult rating

  return (
    <div className="movie-info-container">
      <h1 className="movie-title">{movie.title}</h1>
      <div className="movie-content">
        <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />

        {/* Centered trailer video */}
        {trailerKey && ( // Check if a trailer exists
          <div className="trailer-container">
            <h3 className="trailer-title">Watch Trailer</h3>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Movie information section */}
        <div className="movie-description-container"> {/* New container for the description */}
          <div className="movie-description">
            <p className="overview">{movie.overview}</p>
            <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
            <p><strong>Rating:</strong> {movie.vote_average}/10</p>
            <p><strong>Age Guide:</strong> {ageGuide}</p>
            <h4 className="director">Director: {director ? director.name : 'N/A'}</h4>
            <h4 className="actors-title">Top 5 Actors:</h4>
            <ul className="actors-list">
              {topActors.map((actor) => (
                <li key={actor.id} className="actor-name">{actor.name}</li>
              ))}
            </ul>
            <button onClick={handleAddToWatchlist} className="add-to-watchlist-button">Add to Watchlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
