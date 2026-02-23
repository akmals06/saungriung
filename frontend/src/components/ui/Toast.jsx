import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColors = {
        success: '#f0fdf4',
        error: '#fef2f2',
        info: '#eff6ff'
    };
    
    const textColors = {
        success: '#166534',
        error: '#991b1b',
        info: '#1e40af'
    };

    const icons = {
        success: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>,
        error: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>,
        info: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    };

    return (
        <div style={{
            position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999,
            background: 'white', padding: '1rem 1.5rem', borderRadius: '16px',
            boxShadow: '0 20px 40px -5px rgba(0,0,0,0.1)',
            display: 'flex', alignItems: 'center', gap: '1rem',
            borderLeft: `6px solid ${textColors[type]}`,
            animation: 'slideIn 0.4s ease',
            minWidth: '300px'
        }}>
            <div style={{
                background: bgColors[type], color: textColors[type],
                padding: '8px', borderRadius: '50%', display: 'flex'
            }}>
                {icons[type]}
            </div>
            <div>
                <h4 style={{margin: 0, fontSize: '0.95rem', color: '#1e293b'}}>{type === 'success' ? 'Berhasil' : 'Pemberitahuan'}</h4>
                <p style={{margin: 0, fontSize: '0.85rem', color: '#64748b'}}>{message}</p>
            </div>
        </div>
    );
};

export default Toast;