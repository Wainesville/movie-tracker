// src/api.js
import axios from 'axios';

const API_KEY = '8feb4db25b7185d740785fc6b6f0e850';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_SERVER_URL = 'http://localhost:5000/api'; // Your backend URL

// Fetch Trending Movies
export const fetchTrendingMovies = async (page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
            params: {
                api_key: API_KEY,
                page, // Pass the page number
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
};

// Removed fetchRandomMovies to avoid undefined setMovies
// You can fetch random movies within a component where setMovies is defined

// Fetch Movie Info
export const fetchMovieInfo = async (id) => {
  try {
    // Fetch movie details
    const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
    const creditsResponse = await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
    
    // Combine movie details with credits
    return { ...response.data, credits: creditsResponse.data }; 
  } catch (error) {
    console.error('Error fetching movie info:', error);
    return null; // Return null if there's an error
  }
};


export const fetchMovieVideos = async (id) => {
  try {
      const response = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
      return response.data.results; // Return the array of videos
  } catch (error) {
      console.error('Error fetching movie videos:', error);
      return []; // Return an empty array if there's an error
  }
};



// Fetch Movie Genres
export const fetchGenres = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
            params: { api_key: API_KEY },
        });
        return response.data.genres; // Return the list of genres
    } catch (error) {
        console.error('Error fetching genres:', error);
        return [];
    }
};

// Fetch Movies by Genre
export const fetchMoviesByGenre = async (genreId) => {
    try {
        const response = await axios.get(`${BASE_URL}/discover/movie`, {
            params: {
                api_key: API_KEY,
                with_genres: genreId,
                sort_by: 'popularity.desc', // Sort by popularity
            },
        });
        return response.data.results; // Return the list of movies
    } catch (error) {
        console.error('Error fetching movies by genre:', error);
        return [];
    }
};

// Fetch Upcoming Movies
export const fetchUpcomingMovies = async (page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
            params: {
                api_key: API_KEY,
                page, // Pass the page number
            },
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
        const response = await axios.get(`${API_SERVER_URL}/watchlist`, {
            headers: {
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
export const addToWatchlist = async (movieId, title, poster) => {
    const token = localStorage.getItem('token');

    // Check if the token is present
    if (!token) {
        console.error("No token found! Please log in.");
        return false;
    }

    // Log the Authorization header to check the token value
    console.log(`Authorization: Bearer ${token}`);

    try {
        await axios.post(`${API_SERVER_URL}/watchlist/add`, {
            movieId,
            title,
            poster,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return true; // Successfully added to watchlist
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized: Invalid or expired token. Please log in again.');
        } else {
            console.error('Error adding to watchlist:', error.response ? error.response.data : error.message);
        }
        return false; // Failed to add to watchlist
    }
};

// Remove from Watchlist
export const removeFromWatchlist = async (movieId) => {
    try {
        await axios.delete(`${API_SERVER_URL}/watchlist/remove/${movieId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return true; // Indicate success
    } catch (error) {
        console.error('Error removing from watchlist:', error);
        return false; // Indicate failure
    }
};

// Search Movies
export const searchMovies = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                query: query,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
};

// Login User
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_SERVER_URL}/auth/login`, credentials);
        localStorage.setItem('token', response.data.token); // Store token in local storage
        return response.data; // Return user data or any relevant info
    } catch (error) {
        console.error('Error logging in:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Register User
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_SERVER_URL}/auth/register`, userData);
        return response.data; // Return user data or any relevant info
    } catch (error) {
        console.error('Error registering:', error);
        throw error; // Rethrow the error for handling in the component
    }
};
