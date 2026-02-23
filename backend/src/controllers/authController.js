const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'rahasia_negara_jangan_disebar'; // Ganti di .env!

exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and Password required' });
    }

    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (err) return res.status(500).json({ message: 'Server Error' });
        if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        // Verify Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1d' });

        // Set HttpOnly Cookie
        res.cookie('token', token, {
            httpOnly: true, // XSS Proof
            secure: process.env.NODE_ENV === 'production', // HTTPS Only
            sameSite: 'strict', // CSRF Protection
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.json({ success: true, message: 'Login successful', user: { username: user.username } });
    });
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out' });
};

exports.checkAuth = (req, res) => {
    // Endpoint untuk frontend cek status login
    const token = req.cookies.token;
    if (!token) return res.json({ authenticated: false });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.json({ authenticated: false });
        res.json({ authenticated: true, user: decoded });
    });
};
