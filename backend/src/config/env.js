require('dotenv').config();

// Validasi Env Variables Kritis
const requiredEnvs = ['JWT_SECRET', 'NODE_ENV'];
const missingEnvs = requiredEnvs.filter(key => !process.env[key]);

if (missingEnvs.length > 0) {
    console.error(`❌ CRITICAL ERROR: Missing environment variables: ${missingEnvs.join(', ')}`);
    process.exit(1); // Matikan server jika config tidak aman
}

module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173', // Default local Vite
    dbPath: process.env.DB_PATH || '../../organization.db'
};
