import React, { useState } from 'react';

const TaskCard = ({ task, onUpdate, onDelete, onStatusChange }) => {
    const { id, title, description, status, createdAt } = task;

    const handleStatusToggle = () => {
        const newStatus = status === 'completed' ? 'pending' : 'completed';
        onStatusChange(id, newStatus);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this task?')) {
            onDelete(id);
        }
    };

    return (
        <div className={`task-card ${status === 'completed' ? 'completed-card' : ''}`}>
            <div className="card-header">
                <h3>{title}</h3>
                <span className={`status-badge ${status}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            </div>
            <p className="description">{description || 'No description provided.'}</p>
            <div className="card-actions">
                <button 
                    className={`btn btn-sm ${status === 'completed' ? 'btn-outline-warning' : 'btn-outline-success'}`}
                    onClick={handleStatusToggle}
                >
                    {status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
                </button>
                <button 
                    className="btn btn-sm btn-outline-primary" 
                    onClick={() => onUpdate(task)}
                >
                    Edit
                </button>
                <button 
                    className="btn btn-sm btn-outline-danger" 
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;