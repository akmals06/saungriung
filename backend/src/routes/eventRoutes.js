const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');
const { validateEvent } = require('../middleware/validationMiddleware');

// Auth Routes
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/check-auth', authController.checkAuth);

// Event Routes
router.get('/', eventController.getAllEvents); // Public

// Protected Routes 🔒
router.post('/', verifyToken, validateEvent, eventController.createEvent);
router.delete('/:id', verifyToken, eventController.deleteEvent);

module.exports = router;