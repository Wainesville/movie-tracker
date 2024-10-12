// src/components/MovieCard.js
import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>Release Date: {movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;

