// backend/server.js
const express = require('express');
const cors = require('cors'); // Import CORS
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Your React frontend URL
    optionsSuccessStatus: 200
  }));
  
app.use(express.json());

// Database connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

// Test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import routes
const authRoutes = require('./routes/auth');
const watchlistRoutes = require('./routes/watchlist');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
