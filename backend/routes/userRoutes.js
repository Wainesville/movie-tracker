const express = require('express');
const { getUserInfo, updateUserInfo } = require('../controllers/userController');
const authenticate = require('../middleware/authenticate'); // Ensure this is the correct path

const router = express.Router();

// Protected route to get user info
router.get('/user-info', authenticate, getUserInfo);

// Protected route to update user info
router.put('/user-info', authenticate, updateUserInfo);

module.exports = router;
