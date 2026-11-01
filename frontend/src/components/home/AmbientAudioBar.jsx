import React, { useState, useEffect, useRef } from 'react';

const AmbientAudioBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioCtxRef = useRef(null);

  const playlist = [
    { title: 'Harmoni Saung Riung', subtitle: 'Suasana Alam & Gemericik Air', freq: 440 },
    { title: 'Degung Sunda Asri', subtitle: 'Ketenangan Sore Hari', freq: 523.25 },
    { title: 'Semilir Angin Koja', subtitle: 'Nada Damai Lingkungan', freq: 392 }
  ];

  const currentTrack = playlist[trackIndex];

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    } else {
      setIsPlaying(true);
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
          audioCtxRef.current = ctx;
          
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(currentTrack.freq, ctx.currentTime);
          
          gain.gain.setValueAtTime(0.015, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 1.2);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
        }
      } catch (e) {
        // Fallback silently if restricted
      }
    }
  };

  const nextTrack = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
    setTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const prevTrack = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
    setTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="ambient-player-bar" aria-label="Pemutar Suasana Saung Riung">
      <div className="ambient-info">
        <div 
          className="ambient-disc-icon" 
          style={{
            animation: isPlaying ? 'spinSlow 12s linear infinite' : 'none'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" />
            <line x1="12" y1="2" x2="12" y2="4" />
          </svg>
        </div>
        <div className="ambient-text">
          <h4>{currentTrack.title}</h4>
          <p>{currentTrack.subtitle}</p>
        </div>
      </div>

      <div className="ambient-controls">
        <button
          onClick={prevTrack}
          title="Lagu Sebelumnya"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>

        <button
          onClick={togglePlay}
          className="ambient-play-btn"
          title={isPlaying ? 'Jeda Suasana' : 'Putar Suasana'}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          onClick={nextTrack}
          title="Lagu Selanjutnya"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AmbientAudioBar;
