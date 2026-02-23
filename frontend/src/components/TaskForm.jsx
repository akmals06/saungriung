import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialData, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description || '');
        }
    }, [initialData]);

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Title is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit({ title, description });
        setTitle('');
        setDescription('');
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                    className={errors.title ? 'error' : ''}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
            </div>
            
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description"
                />
            </div>

            <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                    {initialData ? 'Update Task' : 'Add Task'}
                </button>
                {initialData && (
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;
