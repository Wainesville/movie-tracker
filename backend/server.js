const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/auth');
const watchlistRoutes = require('./routes/watchlist');
const movieRoutes = require('./routes/movieRoutes'); // Import the movie routes
const commentsRoutes = require('./routes/commentsRoutes'); // Import the comment routes
const reviewRoutes = require('./routes/reviewRoutes'); // Import the review routes

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/movies', movieRoutes); // Use movie routes
app.use('/api/reviews', reviewRoutes); // Use review routes
app.use('/api/comments', commentsRoutes); // Use comment routes

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
