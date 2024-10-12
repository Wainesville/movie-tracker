// src/api.js
import axios from 'axios';

const API_KEY = '8feb4db25b7185d740785fc6b6f0e850';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_SERVER_URL = 'http://localhost:5000/api/watchlist'; // Your backend URL

// Fetch Trending Movies
export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
      params: { api_key: API_KEY },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

// Fetch Upcoming Movies
export const fetchUpcomingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: { api_key: API_KEY },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return [];
  }
};

// Fetch Watchlist
export const fetchWatchlist = async () => {
  try {
    const response = await axios.get(API_SERVER_URL, {
      headers: {
        // Add authorization header if needed
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return [];
  }
};

// Add to Watchlist
export const addToWatchlist = async (movieId) => {
  try {
    await axios.post(`${API_SERVER_URL}/add`, { movieId }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return true; // Indicate success
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return false; // Indicate failure
  }
};

  
