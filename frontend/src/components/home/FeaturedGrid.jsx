import React from 'react';

const FeaturedGrid = ({ onSelectAlbum, galleryData, onNavigate }) => {
  const cards = [
    {
      id: 'futsal',
      title: 'Saung Riung Futsal Cup',
      category: 'Olahraga & Pemuda',
      desc: 'Turnamen persahabatan antarwarga lorong untuk memupuk kekompakan dan gaya hidup aktif pemuda RT 009.',
      bannerBg: 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      ),
      metric: '32 Pemuda Terlibat',
      data: galleryData.futsal
    },
    {
      id: 'pertamina',
      title: 'Kemitraan Pertamina',
      category: 'Pemberdayaan Lingkungan',
      desc: 'Kolaborasi strategis pembinaan lingkungan hijau, bibit TOGA, dan fasilitas penunjang bersama PT Pertamina.',
      bannerBg: 'linear-gradient(135deg, #0284c7 0%, #0c4a6e 100%)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      metric: 'Bina Lingkungan CSR',
      data: galleryData.pertamina
    },
    {
      id: 'gowes',
      title: 'Gowes Sehat Bersama',
      category: 'Silaturahmi Akhir Pekan',
      desc: 'Rute santai berkeliling Jakarta Utara setiap Minggu pagi, merawat kebugaran sekaligus mempererat silaturahmi warga.',
      bannerBg: 'linear-gradient(135deg, #f59e0b 0%, #78350f 100%)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5.5" cy="17.5" r="3.5" />
          <circle cx="18.5" cy="17.5" r="3.5" />
          <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L9 9l4.5-3 3 5.5H20" />
        </svg>
      ),
      metric: 'Setiap Minggu Pagi',
      data: galleryData.gowes
    },
    {
      id: 'kerjabakti',
      title: 'Kerja Bakti & Bank Sampah',
      category: 'Kelestarian Lingkungan',
      desc: 'Gotong royong pembersihan saluran air, pemilahan limbah anorganik, dan penghijauan di sepanjang Gg Saiyan.',
      bannerBg: 'linear-gradient(135deg, #84cc16 0%, #365314 100%)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 2.12-5.36L1 4" />
        </svg>
      ),
      metric: 'Dua Pekan Sekali',
      data: galleryData.kerjabakti
    }
  ];

  return (
    <section id="gallery" className="featured-section-wrapper">
      <div className="section-sculpted-header">
        <div>
          <span className="section-overline">PROGRAM & AKSI NYATA</span>
          <h2 className="section-main-title">Inisiatif & Kegiatan Warga</h2>
          <p className="section-main-desc">
            Dokumentasi program nyata, aksi sosial, dan kebersamaan aktif di lingkungan RT 009 Koja.
          </p>
        </div>

        <button 
          onClick={() => onNavigate('events')}
          className="upcoming-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.94rem' }}
        >
          Lihat Kalender Agenda →
        </button>
      </div>

      <div className="cards-organic-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className="featured-card"
            onClick={() => onSelectAlbum(card.data)}
            role="button"
            tabIndex={0}
            title={`Lihat detail ${card.title}`}
          >
            {/* Painterly Vector Art Banner (No External Photos) */}
            <div 
              className="featured-card-art-banner"
              style={{ background: card.bannerBg }}
            >
              <div className="featured-badge-icon">
                {card.icon}
              </div>
              <span className="featured-category-pill">
                {card.category}
              </span>
            </div>

            <div className="featured-card-body">
              <h3 className="featured-card-title">{card.title}</h3>
              
              <p className="featured-desc">
                {card.desc}
              </p>

              <div className="featured-card-footer">
                <span className="featured-metric-text">
                  {card.metric}
                </span>

                <div className="btn-circle-action" title="Buka Detail Inisiatif">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedGrid;
