import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Ensure correct CSS import

const API_KEY = '8feb4db25b7185d740785fc6b6f0e850';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Fetch genres from TMDb API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch suggestions based on genre
  useEffect(() => {
    if (selectedGenre) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`
          );
          setSuggestions(response.data.results);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      };
      fetchSuggestions();
    }
  }, [selectedGenre]);

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  return (
    <div className="search-page">
      <h2>Search Movies</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter movie title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <h3>Or choose a genre:</h3>
      <div className="genre-list">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelectedGenre(genre.id)}
            className={selectedGenre === genre.id ? 'selected' : ''}
          >
            {genre.name}
          </button>
        ))}
      </div>

      <h3>Suggestions</h3>
      <div className="suggestions">
        {suggestions.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h4>{movie.title}</h4>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>

      <h3>Search Results</h3>
      <div className="search-results">
        {searchResults.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h4>{movie.title}</h4>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
