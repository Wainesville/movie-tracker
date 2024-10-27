const db = require('../db'); // Import your database connection

const getUserInfo = async (req, res) => {
    const userId = req.userId; // Ensure req.userId is set by middleware
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const userInfo = await db.query('SELECT username, bio, profile_picture FROM userInfo WHERE id = $1', [userId]); // Use db here instead of pool
        res.json(userInfo.rows[0]); // Return the first row of user info
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update user information
const updateUserInfo = async (req, res) => {
    try {
        const userId = req.userId; // Ensure you use req.userId instead of req.user.id
        const { username, bio, profilePicture } = req.body;

        const updatedUser = await db.query( // Use db.query for updating user info
            'UPDATE userInfo SET username = $1, bio = $2, profile_picture = $3 WHERE id = $4 RETURNING *',
            [username, bio, profilePicture, userId]
        );

        res.json(updatedUser.rows[0]); // Return the updated user info
    } catch (error) {
        res.status(500).json({ message: 'Error updating user information' });
    }
};

// Export both functions
module.exports = {
    getUserInfo,
    updateUserInfo,
};
