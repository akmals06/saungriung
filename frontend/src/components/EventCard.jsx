import React from 'react';

const EventCard = ({ event, onDelete }) => {
    const dateObj = new Date(event.date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleDateString('id-ID', { month: 'short' });
    
    // Dynamic Image
    const getBgImage = (type) => {
        const t = type?.toLowerCase();
        if (t === 'religious') return 'url(https://images.unsplash.com/photo-1601121868379-343d2c984273?auto=format&fit=crop&w=600&q=80)';
        if (t === 'social') return 'url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80)';
        return 'url(https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80)';
    };

    return (
        <div style={{
            background: 'white',
            borderRadius: '24px',
            boxShadow: '0 15px 35px -5px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            transition: 'all 0.4s ease',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            cursor: 'default',
            border: '1px solid rgba(0,0,0,0.02)'
        }}
        onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 25px 50px -10px rgba(15, 57, 43, 0.2)';
        }}
        onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(0,0,0,0.1)';
        }}
        >
            {/* Image Header */}
            <div style={{
                height: '200px',
                backgroundImage: getBgImage(event.type),
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
            }}>
                {/* Category Tag */}
                <span style={{
                    position: 'absolute', top: '15px', right: '15px',
                    background: 'rgba(255,255,255,0.95)',
                    padding: '6px 14px', borderRadius: '50px',
                    fontSize: '0.75rem', fontWeight: '800',
                    textTransform: 'uppercase', letterSpacing: '1px',
                    color: '#0f392b',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                    {event.type || 'Umum'}
                </span>
            </div>

            {/* Content Body */}
            <div style={{padding: '1.5rem', position: 'relative', flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
                
                {/* Floating Date Box - The "Ticket" feel */}
                <div style={{
                    position: 'absolute', top: '-30px', left: '20px',
                    background: '#0f392b', color: 'white',
                    width: '60px', height: '60px',
                    borderRadius: '12px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 10px 20px -5px rgba(15, 57, 43, 0.4)',
                    border: '2px solid white'
                }}>
                    <span style={{fontSize: '1.4rem', fontWeight: '800', lineHeight: 1}}>{day}</span>
                    <span style={{fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase'}}>{month}</span>
                </div>

                <div style={{marginTop: '1.5rem'}}>
                    <h3 style={{
                        margin: '0 0 0.8rem', 
                        fontSize: '1.35rem', 
                        fontWeight: '800', 
                        color: '#1e293b',
                        lineHeight: 1.3
                    }}>
                        {event.title}
                    </h3>
                    
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px', 
                        color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem',
                        fontWeight: '600'
                    }}>
                        <div style={{padding: '6px', background: '#f1f5f9', borderRadius: '50%', color: '#0f392b'}}>
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        {event.location || 'Saung Riung'}
                    </div>

                    <p style={{
                        color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', margin: 0,
                        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                    }}>
                        {event.description}
                    </p>
                </div>

                {onDelete && (
                    <div style={{marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end'}}>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                if(window.confirm('Hapus agenda?')) onDelete(event.id);
                            }}
                            style={{
                                background: '#fee2e2', border: 'none', 
                                color: '#ef4444', cursor: 'pointer', 
                                padding: '8px 12px', borderRadius: '8px',
                                fontSize: '0.8rem', fontWeight: '700',
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                transition: '0.2s'
                            }}
                            onMouseOver={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white'; }}
                            onMouseOut={e => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.color = '#ef4444'; }}
                        >
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Hapus
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventCard;