const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const xss = require('xss-clean');
const hpp = require('hpp');
const config = require('../config/env');

// 1. Rate Limiter (Anti DDoS / Brute Force)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 100, // Limit 100 request per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests from this IP, please try again later.' }
});

// 2. Strict CORS
const corsOptions = {
    origin: config.frontendUrl, // Hanya domain frontend yang boleh akses
    credentials: true, // Izinkan cookie
    optionsSuccessStatus: 200
};

module.exports = (app) => {
    // Set Security Headers
    app.use(helmet());

    // Prevent XSS Attacks (Membersihkan input dari script jahat)
    app.use(xss());

    // Prevent HTTP Parameter Pollution
    app.use(hpp());

    // Enable CORS
    app.use(cors(corsOptions));

    // Apply Rate Limiting to all requests
    app.use(limiter);
};