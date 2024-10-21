const express = require('express');
const router = express.Router();
const db = require('../db'); 

// Create a new review
// Create a new review
router.post('/', async (req, res) => {
    const { user_id, movie_id, content, recommendation } = req.body;

    console.log('Request Body:', req.body); // Log the request body for debugging

    // Validate required fields
    if (!user_id || !movie_id || !content) {
        return res.status(400).json({ error: 'Missing required fields: user_id, movie_id, content' });
    }

    try {
        // Check if the movie exists
        const movieCheck = await db.query('SELECT * FROM movies WHERE id = $1', [movie_id]);

        // If the movie does not exist, insert it into the movies table
        if (movieCheck.rows.length === 0) {
            // Insert the movie into the movies table. You may need to adjust this query based on your schema.
            await db.query(
                'INSERT INTO movies (id, title) VALUES ($1, $2)', // Adjust the fields as necessary
                [movie_id, 'Default Movie Title'] // Provide a default or fetch title from an API
            );
        }

        // Proceed to insert the review
        const newReview = await db.query(
            'INSERT INTO reviews (user_id, movie_id, content, recommendation) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, movie_id, content, recommendation]
        );

        res.status(201).json(newReview.rows[0]); // Return the created review
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
            'SELECT r.*, u.username FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.movie_id = $1 ORDER BY r.created_at DESC',
            [movie_id]
        );
        res.status(200).json(reviews.rows); // Return the fetched reviews
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

module.exports = router;


