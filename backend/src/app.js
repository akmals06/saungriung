const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); // HTTP Request Logger
const path = require('path');

// Load Config & Security
const config = require('./config/env');
const applySecurityMiddleware = require('./middleware/security');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');

// Load Routes
const eventRoutes = require('./routes/eventRoutes');
const authController = require('./controllers/authController'); // Direct import for simple auth routes

const app = express();

// 1. Apply Security Layer (Helmet, CORS, RateLimit, XSS, HPP)
applySecurityMiddleware(app);

// 2. Logging (Morgan connected to Winston)
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// 3. Parsers
app.use(express.json({ limit: '10kb' })); // Batasi body max 10kb (Anti DDoS)
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 4. Routes
app.use('/api/events', eventRoutes);
app.post('/api/auth/login', authController.login);
app.post('/api/auth/logout', authController.logout);
app.get('/api/auth/check', authController.checkAuth);

// Root Endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'Saung Riung Secure API 🛡️',
        environment: config.env 
    });
});

// 5. Global Error Handler
app.use(errorHandler);

module.exports = app;