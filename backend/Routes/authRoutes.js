
const express = require('express');
const router = express.Router();
const { signup, login } = require('../Controllers/authController');
const { protect } = require('../Middlewares/authMiddleware');

// Public routes
router.post('/signup', signup);
router.post('/sogin', login);

// Protected route (Only logged-in users can see this)
router.get('/me', protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;