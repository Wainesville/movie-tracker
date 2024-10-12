// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT token generation
const pool = require('../db'); // Assuming db.js exports your pool

// Register user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id', [username, hashedPassword]);
        const userId = result.rows[0].id;
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
