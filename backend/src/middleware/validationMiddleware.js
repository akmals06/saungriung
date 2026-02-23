const { body, validationResult } = require('express-validator');

// Sanitasi & Validasi Input Event
exports.validateEvent = [
    body('title').trim().notEmpty().withMessage('Title is required').escape(), // Escape HTML chars
    body('description').trim().optional().escape(),
    body('date').isISO8601().toDate(),
    body('location').trim().escape(),
    body('type').isIn(['general', 'social', 'religious']).withMessage('Invalid Type'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    }
];
