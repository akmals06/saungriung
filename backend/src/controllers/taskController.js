const db = require('../config/database');

exports.getAllTasks = (req, res, next) => {
    const query = 'SELECT * FROM tasks ORDER BY created_at DESC';
    db.all(query, [], (err, rows) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ success: true, data: rows });
    });
};

exports.createTask = (req, res, next) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const query = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
    db.run(query, [title, description], function(err) {
        if (err) {
            return next(err);
        }
        const newTask = {
            id: this.lastID,
            title,
            description,
            status: 'pending',
            created_at: new Date().toISOString()
        };
        res.status(201).json({ success: true, data: newTask });
    });
};

exports.updateTask = (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const query = 'UPDATE tasks SET title = ?, description = ? WHERE id = ?';
    db.run(query, [title, description, id], function(err) {
        if (err) {
            return next(err);
        }
        if (this.changes === 0) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task updated' });
    });
};

exports.toggleTaskStatus = (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    const query = 'UPDATE tasks SET status = ? WHERE id = ?';
    db.run(query, [status, id], function(err) {
        if (err) {
            return next(err);
        }
        if (this.changes === 0) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task status updated' });
    });
};

exports.deleteTask = (req, res, next) => {
    const { id } = req.params;
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.run(query, [id], function(err) {
        if (err) {
            return next(err);
        }
        if (this.changes === 0) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task deleted' });
    });
};