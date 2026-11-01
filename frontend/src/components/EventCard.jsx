import React from 'react';

const EventCard = ({ event, onDelete }) => {
  const dateObj = new Date(event.date || Date.now());
  const day = isNaN(dateObj.getDate()) ? '15' : dateObj.getDate();
  const month = isNaN(dateObj.getDate()) 
    ? 'Nov' 
    : dateObj.toLocaleDateString('id-ID', { month: 'short' });

  const getTypeClass = (type) => {
    const t = type?.toLowerCase() || '';
    if (t === 'religious' || t === 'keagamaan') return 'type-religious';
    if (t === 'social' || t === 'sosial') return 'type-social';
    return 'type-general';
  };

  const getTypeLabel = (type) => {
    const t = type?.toLowerCase() || '';
    if (t === 'religious' || t === 'keagamaan') return 'Keagamaan & Pengajian';
    if (t === 'social' || t === 'sosial') return 'Sosial & Gotong Royong';
    return 'Olahraga & Pemuda';
  };

  return (
    <article className="event-tactile-card">
      <div className="event-card-top">
        <div className="event-date-badge">
          <span className="event-date-day">{day}</span>
          <span className="event-date-month">{month}</span>
        </div>

        <span className={`event-type-pill ${getTypeClass(event.type)}`}>
          {getTypeLabel(event.type)}
        </span>
      </div>

      <div className="event-card-body">
        <h3 className="event-card-title">{event.title}</h3>

        <div className="event-card-meta-row">
          <div className="event-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{event.location || 'Saung Riung RT 009'}</span>
          </div>

          <div className="event-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>07:30 WIB - Selesai</span>
          </div>
        </div>

        <p className="event-card-desc">
          {event.description}
        </p>
      </div>

      <div className="event-card-footer">
        <div className="event-status-tag">
          <span className="status-indicator-dot" />
          <span>Terbuka Untuk Warga</span>
        </div>

        {onDelete && (
          <button
            onClick={() => {
              if (window.confirm(`Hapus agenda "${event.title}"?`)) {
                onDelete(event.id);
              }
            }}
            className="event-btn-delete-subtle"
            title="Hapus agenda (Khusus Pengurus RT)"
            aria-label="Hapus agenda"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <span>Hapus</span>
          </button>
        )}
      </div>
    </article>
  );
};

export default EventCard;