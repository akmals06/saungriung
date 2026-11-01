import React from 'react';

const SupportingTriGrid = ({ onOpenService, onOpenMap }) => {
  return (
    <section id="services" className="supporting-section-wrapper">
      <div className="bottom-tri-grid">
        {/* 1. COMMUNITY PHILOSOPHY CARD (Matches Reference "Travel Inspiration") */}
        <div className="philosophy-sculpted-card">
          <div className="philosophy-header">
            <span className="philosophy-badge">
              FALSAFAH & NILAI GUYUB
            </span>
            <div style={{ color: '#fef08a' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>

          <p className="philosophy-quote">
            “Silih asah, silih asih, silih asuh. Guyub rukun ngawangun lembur.”
          </p>

          <div>
            <p className="philosophy-desc">
              Saling menajamkan pemikiran, saling mengasihi antarwarga, dan saling menjaga keharmonisan.
              Prinsip luhur yang mendasari setiap langkah paguyuban Saung Riung.
            </p>
            <span className="philosophy-author">
              — Paguyuban Warga RT 009 / RW 002 Koja
            </span>
          </div>
        </div>

        {/* 2. CITIZEN QUICK SERVICES (Matches Reference 4 Round Action Buttons) */}
        <div className="quick-services-tray">
          <div className="quick-services-header">
            <span className="section-overline">LAYANAN MASYARAKAT</span>
            <h3 className="quick-services-title">Akses Cepat Warga</h3>
          </div>

          <div className="quick-tiles-grid">
            <button 
              className="service-tile-item"
              onClick={() => onOpenService('layanan-rt')}
              title="Layanan Pengantar & Administrasi RT"
            >
              <div className="service-tile-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="service-tile-text">
                <span className="name">Surat RT</span>
                <span className="sub">Administrasi</span>
              </div>
            </button>

            <button 
              className="service-tile-item"
              onClick={() => onOpenService('bank-sampah')}
              title="Bank Sampah Kelurahan Tugu Selatan"
            >
              <div className="service-tile-icon-box" style={{ color: '#16a34a' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0 1 2.12-5.36L1 4" />
                </svg>
              </div>
              <div className="service-tile-text">
                <span className="name">Bank Sampah</span>
                <span className="sub">Pilah & Tabung</span>
              </div>
            </button>

            <button 
              className="service-tile-item"
              onClick={() => onOpenService('pos-ronda')}
              title="Keamanan & Pos Ronda 24 Jam"
            >
              <div className="service-tile-icon-box" style={{ color: '#d97706' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="service-tile-text">
                <span className="name">Siskamling</span>
                <span className="sub">Siaga 24 Jam</span>
              </div>
            </button>

            <button 
              className="service-tile-item"
              onClick={() => onOpenService('aspirasi')}
              title="Kirim Aspirasi & Masukan Warga"
            >
              <div className="service-tile-icon-box" style={{ color: '#0284c7' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="service-tile-text">
                <span className="name">Aspirasi</span>
                <span className="sub">Suara Warga</span>
              </div>
            </button>
          </div>
        </div>

        {/* 3. SECRETARIAT & MAP CARD (Matches Reference "Explore the Map") */}
        <div className="map-sculpted-card">
          <div>
            <span className="section-overline">SEKRETARIAT & TITIK TEMU</span>
            <h3 className="map-card-title">Wilayah RT 009 / RW 002</h3>
            <p className="map-card-subtitle">
              Kelurahan Tugu Selatan, Kecamatan Koja, Jakarta Utara
            </p>
          </div>

          <div className="map-details-box">
            <div className="map-details-row">
              <div className="map-row-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <strong className="map-row-label">Lokasi:</strong>
                <span className="map-row-value">Gg Saiyan, RT 009 / RW 002</span>
              </div>
            </div>

            <div className="map-details-row">
              <div className="map-row-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <strong className="map-row-label">Titik Kumpul:</strong>
                <span className="map-row-value">Saung Riung & Pos Siskamling</span>
              </div>
            </div>

            <div className="map-details-row">
              <div className="map-row-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <strong className="map-row-label">Pelayanan RT:</strong>
                <span className="map-row-value">Senin - Sabtu (19:00 - 21:30 WIB)</span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenMap}
            className="btn-tactile btn-tactile-primary map-action-btn"
          >
            <span>Buka Peta Interaktif & Navigasi</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SupportingTriGrid;
