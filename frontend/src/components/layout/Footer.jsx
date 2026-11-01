import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="sculpted-footer">
      <div className="footer-grid">
        {/* Brand Information */}
        <div className="footer-brand">
          <div className="footer-brand-header">
            <div className="footer-brand-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18" />
                <path d="M5 21V10l7-5 7 5v11" />
                <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
              </svg>
            </div>
            <h3 className="footer-title">
              <span>Saung</span> Riung
            </h3>
          </div>

          <p className="footer-desc">
            Pusat silaturahmi dan kebersamaan warga RT 009 / RW 002 Kelurahan Tugu Selatan, Kecamatan Koja, Jakarta Utara.
            Membangun ekosistem lingkungan yang harmonis, asri, aman, dan transparan melalui gotong royong aktif.
          </p>

          <div className="footer-tags-row">
            <span className="footer-pill-tag">
              50+ Kepala Keluarga
            </span>
            <span className="footer-pill-tag">
              Siskamling 24 Jam
            </span>
            <span className="footer-pill-tag">
              Bank Sampah Mandiri
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-column">
          <h4 className="footer-col-title">Navigasi Halaman</h4>
          <ul className="footer-links-list">
            <li><a href="#home">Beranda Utama</a></li>
            <li><a href="#about">Profil & Kemitraan</a></li>
            <li><a href="#gallery">Inisiatif Warga</a></li>
            <li><a href="#services">Layanan & Wilayah</a></li>
            <li><a href="#events">Kalender Agenda</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-column">
          <h4 className="footer-col-title">Sekretariat Pengurus</h4>
          <ul className="footer-links-list">
            <li>
              <div className="footer-contact-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ochre-warm)' }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:info@saungriung.id">info@saungriung.id</a>
              </div>
            </li>
            <li>
              <div className="footer-contact-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ochre-warm)' }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">+62 812-3456-7890 (Pengurus)</a>
              </div>
            </li>
            <li>
              <div className="footer-contact-item" style={{ alignItems: 'flex-start' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ochre-warm)', marginTop: '3px' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <a href="https://maps.app.goo.gl/4mR1LhRbk9KqmBuF8" target="_blank" rel="noreferrer">
                  Gg Saiyan, RT 009 / RW 002, Kel. Tugu Selatan, Kec. Koja, Jakarta Utara
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Location & Access Info Card */}
        <div className="footer-column">
          <h4 className="footer-col-title">Lokasi & Titik Akses</h4>
          <div className="footer-location-card">
            <div className="footer-location-head">
              <span className="dot" />
              <span>Gg Saiyan Koja (Patokan Masjid Al-Mukhlisin)</span>
            </div>
            <p className="footer-location-text">
              Dapat diakses melalui Jl. Plumpang Semper atau Jl. Kramat Jaya. Tersedia area parkir motor warga dan pos jaga 24 jam.
            </p>
            <a 
              href="https://maps.app.goo.gl/4mR1LhRbk9KqmBuF8" 
              target="_blank" 
              rel="noreferrer"
              className="footer-map-btn"
            >
              <span>Petunjuk Arah Google Maps</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div>
          &copy; {new Date().getFullYear()} Paguyuban Saung Riung RT 009 / RW 002 Koja, Jakarta Utara.
        </div>
        <div className="footer-credits">
          Transparan · Bersahabat · Berkelanjutan
        </div>
      </div>
    </footer>
  );
};

export default Footer;
