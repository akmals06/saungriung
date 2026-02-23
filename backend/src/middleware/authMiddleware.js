const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'rahasia_negara_jangan_disebar';

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access Denied. Please Login.' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ success: false, message: 'Invalid Token' });
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
