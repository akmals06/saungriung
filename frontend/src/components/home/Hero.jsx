import React from 'react';

const Hero = ({ onExploreEvents, onOpenNewEvent, onNavigate }) => {
  return (
    <section id="home" className="hero-organic-grid">
      {/* 1. SCULPTED CERAMIC HERO TRAY WITH PAINTERLY VECTOR WINDOW (Zero Images) */}
      <div className="hero-ceramic-tray">
        {/* Handwritten Casual Script Accent (Matches "Let's Explore" in Reference) */}
        <div className="hero-script-tag">
          <span>Guyub & Asri 🌿</span>
        </div>

        {/* Inner Painterly Window (Rich Vector Sunset & Hill Atmosphere) */}
        <div className="hero-sculpted-window">
          <div className="hero-vector-landscape" />

          {/* Top Content */}
          <div className="hero-overlay-content">
            <div className="hero-status-pill">
              <span className="hero-status-dot" />
              <span>Pusat Informasi & Sinergi Komunitas RT 009</span>
            </div>
            
            <h1 className="hero-title">
              Saung Riung
            </h1>
            
            <p className="hero-subtitle">
              RT 009 / RW 002 Kelurahan Tugu Selatan, Koja, Jakarta Utara
            </p>
            
            <p className="hero-desc">
              Ruang silaturahmi, gotong royong, dan transparansi kegiatan warga.
              Menghadirkan lingkungan yang harmonis, asri, aman, dan berdaya melalui
              kebersamaan yang berkelanjutan.
            </p>

            <div className="hero-actions-row">
              <button 
                onClick={onExploreEvents}
                className="btn-tactile hero-btn-white"
              >
                <span>Jelajahi Agenda Warga</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <button 
                onClick={() => onNavigate('about')}
                className="btn-tactile hero-btn-glass"
              >
                Profil Wilayah
              </button>

              <button 
                onClick={() => onNavigate('services')}
                className="btn-tactile hero-btn-glass"
              >
                Layanan Warga
              </button>
            </div>
          </div>

          {/* Bottom Bar: Overlapping Avatar Pill Cluster (Matches Reference Bottom-Left) */}
          <div className="hero-bottom-actions">
            <div className="hero-avatar-stack-wrap">
              <div className="hero-avatar-bubble-row">
                <div className="hero-avatar-circle" title="Rukun Tetangga 009">RT</div>
                <div className="hero-avatar-circle" style={{ background: '#fef08a' }} title="Rukun Warga 002">09</div>
                <div className="hero-avatar-circle" style={{ background: '#bbf7d0' }} title="Koja Jakarta Utara">02</div>
              </div>
              <span className="hero-avatar-label">50+ Kepala Keluarga Guyub</span>
            </div>

            <button
              onClick={onOpenNewEvent}
              className="btn-tactile hero-btn-propose"
            >
              + Usulkan Kegiatan
            </button>
          </div>
        </div>
      </div>

      {/* 2. SECONDARY SCULPTED CERAMIC COLUMN (Pebble Weather & Upcoming Event) */}
      <div className="hero-side-column">
        {/* Sculpted Pebble Weather Card (Matches Reference Pebble) */}
        <div className="weather-pebble-card">
          <div className="weather-card-header">
            <div className="weather-tag">
              <span className="live-dot" />
              <span>Kondisi Lingkungan</span>
            </div>
            <span className="weather-time">Koja Real-time</span>
          </div>

          <div className="weather-main-row">
            <div className="weather-vector-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            </div>

            <div>
              <div className="weather-degree">29°C</div>
              <div className="weather-condition">Cerah Berawan</div>
            </div>
          </div>

          <div className="weather-details-grid">
            <div className="weather-detail-item">
              <span className="label">Kelembapan</span>
              <span className="val">74%</span>
            </div>
            <div className="weather-detail-item">
              <span className="label">Kualitas Udara</span>
              <span className="val" style={{ color: '#16a34a' }}>Baik (AQI 42)</span>
            </div>
            <div className="weather-detail-item">
              <span className="label">Siskamling</span>
              <span className="val" style={{ color: '#059669' }}>Kondusif</span>
            </div>
          </div>
        </div>

        {/* Sculpted Upcoming Event Card (Matches Reference "Upcoming Trip") */}
        <div className="upcoming-event-card">
          <div className="upcoming-header">
            <h4>Agenda Terdekat</h4>
            <a 
              href="#events" 
              onClick={(e) => { e.preventDefault(); onNavigate('events'); }}
              className="upcoming-link"
            >
              Semua Agenda →
            </a>
          </div>

          <div 
            className="upcoming-item-box"
            onClick={() => onNavigate('events')}
            role="button"
            tabIndex={0}
            title="Klik untuk melihat agenda"
          >
            <div className="upcoming-date-box">
              <span className="date-num">15</span>
              <span className="date-mon">NOV</span>
            </div>

            <div className="upcoming-details">
              <div className="upcoming-title">Kerja Bakti Lingkungan</div>
              <div className="upcoming-meta">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Minggu Ini · 07:00 WIB</span>
              </div>
              <div className="upcoming-location">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Sepanjang Gg Saiyan RT 009</span>
              </div>
            </div>

            <div className="btn-circle-action">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
