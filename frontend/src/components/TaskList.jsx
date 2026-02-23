import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, loading }) => {
    if (loading) {
        return <p>Loading tasks from backend...</p>;
    }

    if (!tasks || tasks.length === 0) {
        return <p>No tasks found.</p>;
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
