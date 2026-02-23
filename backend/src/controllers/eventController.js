const db = require('../config/database');
const logger = require('../utils/logger');

exports.getAllEvents = (req, res) => {
    const query = 'SELECT * FROM events ORDER BY date ASC';
    db.all(query, [], (err, rows) => {
        if (err) {
            logger.error(`DB Error: ${err.message}`);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        res.status(200).json({ success: true, data: rows });
    });
};

exports.createEvent = (req, res) => {
    // Input sudah divalidasi oleh middleware express-validator sebelum masuk sini
    const { title, description, date, location, type } = req.body;

    const query = 'INSERT INTO events (title, description, date, location, type) VALUES (?, ?, ?, ?, ?)';
    db.run(query, [title, description, date, location, type], function(err) {
        if (err) {
            logger.error(`Create Event Error: ${err.message}`);
            return res.status(500).json({ success: false, message: 'Failed to create event' });
        }
        
        logger.info(`New event created: ${title} by User ID: ${req.user.id}`);
        
        const newEvent = {
            id: this.lastID,
            title, description, date, location, type,
            status: 'upcoming'
        };
        res.status(201).json({ success: true, data: newEvent });
    });
};

exports.deleteEvent = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM events WHERE id = ?';
    db.run(query, [id], function(err) {
        if (err) {
            logger.error(`Delete Event Error: ${err.message}`);
            return res.status(500).json({ success: false, message: 'Failed to delete event' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        
        logger.info(`Event deleted ID: ${id} by User ID: ${req.user.id}`);
        res.status(200).json({ success: true, message: 'Event deleted' });
    });
};