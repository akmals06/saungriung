const app = require('./src/app');

// Vercel Serverless Function Handler
module.exports = (req, res) => {
    app(req, res);
};
