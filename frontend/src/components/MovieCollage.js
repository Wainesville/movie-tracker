import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import CSS for styling

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieCollage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchRandomMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
          params: { api_key: API_KEY },
        });
        setMovies(response.data.results.slice(0, 50)); // Get first 50 movies for a fuller collage
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchRandomMovies();
  }, []);

  // Function to generate random rotation and translation
  const getRandomStyle = () => {
    const rotation = Math.random() * 10 - 5; // Random rotation between -5 and 5 degrees
    const translateX = Math.random() * 100 - 50; // Random translateX between -50 and 50 pixels
    const translateY = Math.random() * 100 - 50; // Random translateY between -50 and 50 pixels

    return {
      transform: `rotate(${rotation}deg) translate(${translateX}px, ${translateY}px)`,
    };
  };

  return (
    <div className="movie-collage">
      {movies.map((movie) => (
        <img
          key={movie.id}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="collage-image"
          style={getRandomStyle()} // Apply random styles here
        />
      ))}
    </div>
  );
};

export default MovieCollage;
