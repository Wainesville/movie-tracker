const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

// Get watchlist for a user
const getWatchlist = async (req, res) => {
    const userId = req.user.id; // Assuming you handle user authentication and get the user ID
    try {
        const result = await pool.query('SELECT * FROM watchlist WHERE user_id = $1', [userId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Add to watchlist
const addToWatchlist = async (req, res) => {
    const { movieId } = req.body;
    const userId = req.user.id; // Assuming you handle user authentication and get the user ID
    try {
        await pool.query('INSERT INTO watchlist (user_id, movie_id) VALUES ($1, $2)', [userId, movieId]);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

module.exports = { getWatchlist, addToWatchlist };

