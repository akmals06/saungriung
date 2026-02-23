import React from 'react';

const EventCard = ({ event, onDelete }) => {
    const dateObj = new Date(event.date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleDateString('id-ID', { month: 'short' });
    const year = dateObj.getFullYear();

    return (
        <div className="event-card-modern">
            <div className="event-calendar">
                <span className="cal-day">{day}</span>
                <span className="cal-month">{month}</span>
            </div>
            <div className="event-details">
                <div className="event-badges">
                    <span className={`badge-type ${event.type}`}>{event.type || 'Umum'}</span>
                </div>
                <h3>{event.title}</h3>
                <p className="event-desc">{event.description}</p>
                <div className="event-footer">
                    <span className="location-text">📍 {event.location || 'Saung Riung'}</span>
                </div>
            </div>
            {/* Delete button (hidden by default via CSS unless needed) */}
            <button className="delete-trigger" onClick={() => onDelete(event.id)}>×</button>
        </div>
    );
};

export default EventCard;