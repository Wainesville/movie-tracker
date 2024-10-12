// routes/watchlist.js
const express = require('express');
const { getWatchlist, addToWatchlist } = require('../controllers/watchlistController');
const router = express.Router();

router.get('/', getWatchlist);
router.post('/add', addToWatchlist);

module.exports = router;
