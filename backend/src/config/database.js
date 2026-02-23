const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

// Deteksi lingkungan Vercel
const isVercel = process.env.VERCEL === '1';

let dbPath;
if (isVercel) {
    // Di Vercel, gunakan folder temporary (Data akan hilang saat restart!)
    dbPath = '/tmp/organization.db';
} else {
    // Di Local, gunakan folder biasa
    dbPath = path.resolve(__dirname, '../../organization.db');
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log(`🔒 Connected to Database at ${dbPath}`);
    }
});

db.serialize(() => {
    // 1. Events Table
    db.run(`CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        date DATETIME,
        location TEXT,
        type TEXT DEFAULT 'general',
        status TEXT DEFAULT 'upcoming',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // 2. Users Table (Admin)
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'admin',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, async (err) => {
        if (!err) {
            // Cek admin
            db.get("SELECT id FROM users WHERE username = 'admin'", [], async (err, row) => {
                if (!row) {
                    const salt = await bcrypt.genSalt(12);
                    const hashedPassword = await bcrypt.hash('saungriung123', salt);
                    
                    const insert = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
                    insert.run('admin', hashedPassword);
                    insert.finalize();
                    console.log('🛡️ Default Admin Created');
                }
            });
        }
    });
});

module.exports = db;