const express = require('express');
const router = express.Router();
const db = require('../db'); 

// Create a new review
router.post('/', async (req, res) => {
    const { user_id, movie_id, content, recommendation, movie_title, thumbnail } = req.body;

    console.log('Request Body:', req.body);

    // Validate required fields
    if (!user_id || !movie_id || !content || !movie_title || !thumbnail) {
        return res.status(400).json({ error: 'Missing required fields: user_id, movie_id, content, movie_title, thumbnail' });
    }

    try {
        // Check if the movie exists
        const movieCheck = await db.query('SELECT * FROM movies WHERE id = $1', [movie_id]);

        // If the movie does not exist, insert it into the movies table
        if (movieCheck.rows.length === 0) {
            await db.query(
                'INSERT INTO movies (id, title, thumbnail) VALUES ($1, $2, $3)',
                [movie_id, movie_title, thumbnail]
            );
        }

        // Proceed to insert the review
        const newReview = await db.query(
            'INSERT INTO reviews (user_id, movie_id, content, recommendation, movie_title, thumbnail) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [user_id, movie_id, content, recommendation, movie_title, thumbnail]
        );

        res.status(201).json(newReview.rows[0]);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Failed to create review' });
    }
});

// Get reviews for a specific movie
router.get('/:movie_id', async (req, res) => {
    const { movie_id } = req.params;

    try {
        const reviews = await db.query(
            'SELECT r.*, u.username, m.thumbnail, m.title FROM reviews r JOIN users u ON r.user_id = u.id JOIN movies m ON r.movie_id = m.id WHERE r.movie_id = $1 ORDER BY r.created_at DESC',
            [movie_id]
        );
        res.status(200).json(reviews.rows);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await db.query(
            'SELECT r.*, u.username, m.thumbnail, m.title FROM reviews r JOIN users u ON r.user_id = u.id JOIN movies m ON r.movie_id = m.id ORDER BY r.created_at DESC'
        );
        res.status(200).json(reviews.rows);
    } catch (error) {
        console.error('Error fetching all reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

// Like a review
router.post('/:reviewId/like', async (req, res) => {
    const { user_id } = req.body; // Get the user ID from the request body
    const { reviewId } = req.params; // Get the review ID from the URL

    try {
        const result = await db.query(
            'INSERT INTO review_likes (review_id, user_id) VALUES ($1, $2) RETURNING *',
            [reviewId, user_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error liking review:', error);
        res.status(500).json({ error: 'Failed to like review' });
    }
});

// Unlike a review
router.delete('/:reviewId/like', async (req, res) => {
    const { user_id } = req.body; // Get the user ID from the request body
    const { reviewId } = req.params; // Get the review ID from the URL

    try {
        await db.query(
            'DELETE FROM review_likes WHERE review_id = $1 AND user_id = $2',
            [reviewId, user_id]
        );
        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error('Error unliking review:', error);
        res.status(500).json({ error: 'Failed to unlike review' });
    }
});

// Get likes count for a review
router.get('/:reviewId/likes', async (req, res) => {
    const { reviewId } = req.params;

    try {
        const result = await db.query(
            'SELECT COUNT(*) FROM review_likes WHERE review_id = $1',
            [reviewId]
        );
        res.status(200).json({ likes: parseInt(result.rows[0].count) });
    } catch (error) {
        console.error('Error fetching likes count:', error);
        res.status(500).json({ error: 'Failed to fetch likes count' });
    }
});

module.exports = router;
