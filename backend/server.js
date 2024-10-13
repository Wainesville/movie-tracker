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

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
