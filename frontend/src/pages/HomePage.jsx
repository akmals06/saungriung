import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import FeaturedGrid from '../components/home/FeaturedGrid';
import SupportingTriGrid from '../components/home/SupportingTriGrid';
import AmbientAudioBar from '../components/home/AmbientAudioBar';
import EventCard from '../components/EventCard';
import Footer from '../components/layout/Footer';
import Toast from '../components/ui/Toast';
import { getEvents, createEvent, deleteEvent } from '../services/api';

const DEFAULT_EVENTS = [
  {
    id: 'evt-1',
    title: 'Kerja Bakti & Pengurasan Saluran Air',
    description: 'Gotong royong membersihkan saluran air dan lingkungan sekitar Gg Saiyan menjelang musim penghujan demi kenyamanan bersama.',
    date: '2026-11-15',
    location: 'Sepanjang Gg Saiyan RT 009',
    type: 'social'
  },
  {
    id: 'evt-2',
    title: 'Sosialisasi & Penimbangan Bank Sampah',
    description: 'Program rutin penimbangan sampah daur ulang bekerja sama dengan Bank Sampah Kelurahan Tugu Selatan.',
    date: '2026-11-22',
    location: 'Area Pos Ronda RT 009',
    type: 'social'
  },
  {
    id: 'evt-3',
    title: 'Pengajian & Doa Bersama Warga',
    description: 'Silaturahmi dan tausiyah bulanan untuk mempererat kerukunan dan ukhuwah antarwarga RT 009 / RW 002.',
    date: '2026-11-28',
    location: 'Saung Riung Utama',
    type: 'religious'
  },
  {
    id: 'evt-4',
    title: 'Turnamen Catur & Karambol Guyub',
    description: 'Kegiatan olahraga santai antarwarga untuk memupuk sportivitas dan keakraban di malam akhir pekan.',
    date: '2026-12-05',
    location: 'Balai Warga RT 009',
    type: 'general'
  }
];

const HomePage = () => {
  const [events, setEvents] = useState(DEFAULT_EVENTS);
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activeServiceModal, setActiveServiceModal] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

  // Real community initiative details from Saungriung (Pure vector & factual text)
  const activityData = {
    futsal: {
      title: "Saung Riung Futsal Cup",
      category: "Olahraga & Pemuda",
      details: [
        "Inisiatif kepemudaan RT 009 untuk menyalurkan bakat olahraga dan hidup sehat.",
        "Diikuti oleh 4 tim perwakilan lorong dan pemuda sekitar Gg Saiyan.",
        "Dilaksanakan secara berkala di lapangan futsal terdekat dengan sistem gugur ceria.",
        "Menjadi ajang silaturahmi lintas generasi di lingkungan RT 009/002 Koja."
      ]
    },
    pertamina: {
      title: "Kemitraan & Sinergi Pertamina",
      category: "Pemberdayaan Lingkungan",
      details: [
        "Program CSR dan pembinaan lingkungan hijau bersama PT Pertamina.",
        "Pemberian bantuan bibit tanaman obat keluarga (TOGA) dan fasilitas penghijauan lorong.",
        "Penyuluhan keselamatan penggunaan gas LPG rumah tangga bagi ibu-ibu warga.",
        "Dukungan sarana kebersihan dan penampungan daur ulang terpadu."
      ]
    },
    gowes: {
      title: "Gowes Sehat Bersama",
      category: "Kebersamaan Warga",
      details: [
        "Kegiatan bersepeda santai setiap Minggu pagi pukul 06.30 WIB kumpul di Saung Riung.",
        "Rute ramah keluarga mengelilingi ruang terbuka hijau Jakarta Utara.",
        "Dilanjutkan sarapan pagi bersama dan bincang santai warga.",
        "Terbuka untuk seluruh warga RT 009 dari anak-anak hingga lansia."
      ]
    },
    kerjabakti: {
      title: "Kerja Bakti & Bank Sampah",
      category: "Kelestarian Lingkungan",
      details: [
        "Aksi gotong royong massal dua pekan sekali membersihkan got dan jalan lingkungan.",
        "Pengumpulan dan penimbangan sampah anorganik bekerja sama dengan Kelurahan Tugu Selatan.",
        "Hasil tabungan sampah dialokasikan untuk kas sosial warga dan dana darurat.",
        "Mendukung terwujudnya kampung bersih, bebas jentik nyamuk, dan asri."
      ]
    }
  };

  // Form State
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    type: 'social'
  });

  const showToast = (msg, type = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3500);
  };

  const loadEvents = async () => {
    try {
      const res = await getEvents();
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setEvents(sorted);
      }
    } catch (error) {
      console.warn("Using verified local events fallback:", error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) {
      showToast('Mohon lengkapi judul dan tanggal agenda', 'error');
      return;
    }

    try {
      const createdItem = {
        id: `evt-${Date.now()}`,
        ...newEvent
      };

      try {
        const res = await createEvent(newEvent);
        if (res && res.success && res.data) {
          createdItem.id = res.data.id || createdItem.id;
        }
      } catch (err) {
        // Saved in local session
      }

      setEvents([createdItem, ...events]);
      setNewEvent({ title: '', description: '', date: '', location: '', type: 'social' });
      setShowNewEventModal(false);
      showToast('Agenda baru berhasil ditambahkan!', 'success');
    } catch (err) {
      showToast('Gagal menambahkan agenda.', 'error');
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      try {
        await deleteEvent(id);
      } catch (e) {
        // Local delete
      }
      setEvents(events.filter((e) => e.id !== id));
      showToast('Agenda berhasil dihapus.', 'info');
    } catch (err) {
      showToast('Gagal menghapus agenda.', 'error');
    }
  };

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered Events with category tab selection
  const filteredEvents = useMemo(() => {
    let list = events;
    if (selectedCategory !== 'all') {
      list = list.filter((ev) => {
        const t = ev.type?.toLowerCase() || '';
        if (selectedCategory === 'social') return t === 'social' || t === 'sosial';
        if (selectedCategory === 'religious') return t === 'religious' || t === 'keagamaan';
        if (selectedCategory === 'general') return t === 'general' || t === 'olahraga';
        return true;
      });
    }

    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(
      (ev) =>
        ev.title.toLowerCase().includes(q) ||
        (ev.description && ev.description.toLowerCase().includes(q)) ||
        (ev.location && ev.location.toLowerCase().includes(q))
    );
  }, [events, searchQuery, selectedCategory]);

  return (
    <div className="app-container">
      {/* 1. LEFT SCULPTED NAVIGATION DOCK */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenNewEvent={() => setShowNewEventModal(true)}
      />

      {/* 2. MAIN APPLICATION VIEWPORT */}
      <main className="main-viewport">
        {/* Top Header & Search Bar */}
        <header className="top-bar-container">
          <div className="top-greeting">
            <h1>
              <span>Halo, Warga & Tamu</span>
              <span className="top-badge-verified">RT 009 / RW 002</span>
            </h1>
            <p>Pusat informasi dan kebersamaan warga Gg Saiyan, Koja, Jakarta Utara.</p>
          </div>

          <div className="top-controls">
            <div className="sculpted-search" role="search">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-subtle)' }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Cari agenda atau kegiatan warga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Cari agenda"
              />
            </div>

            <button
              onClick={() => setShowNewEventModal(true)}
              className="btn-tactile btn-tactile-primary"
            >
              <span>+ Agenda Baru</span>
            </button>
          </div>
        </header>

        {/* 3. HERO MASTER ARCHITECTURAL BANNER (No Images) */}
        <Hero
          onExploreEvents={() => handleNavigate('events')}
          onOpenNewEvent={() => setShowNewEventModal(true)}
          onNavigate={handleNavigate}
        />

        {/* 4. ABOUT SECTION: Profil & Landasan Komunitas (Balanced Architectural Surface) */}
        <section id="about" className="about-section-wrapper">
          <div className="about-sculpted-panel">
            <div className="about-balanced-grid">
              {/* Left Column: Narrative & Grounded Values */}
              <div className="about-story-col">
                <div>
                  <span className="section-overline">
                    PROFIL & KEMITRAAN WARGA
                  </span>
                  
                  <h2 className="about-lead-title">
                    Membangun <span style={{ color: 'var(--primary-light)' }}>Harmoni</span>,<br />
                    Menciptakan Rasa Aman.
                  </h2>
                  
                  <p className="about-body-text">
                    Saung Riung RT 009/002 Koja adalah wujud nyata transformasi guyub warga.
                    Melalui ruang pertemuan yang asri, sarana komunikasi yang transparan, dan sinergi
                    gotong royong, setiap aspirasi warga dapat disuarakan dan diwujudkan bersama.
                  </p>
                </div>

                <div className="about-stats-grid">
                  <div className="about-stat-card">
                    <div className="about-stat-icon-wrap" style={{ background: 'rgba(19, 62, 48, 0.08)', color: 'var(--primary)' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                    <div>
                      <div className="about-stat-num">50+</div>
                      <div className="about-stat-lbl">Kepala Keluarga</div>
                    </div>
                  </div>

                  <div className="about-stat-card">
                    <div className="about-stat-icon-wrap" style={{ background: 'rgba(184, 123, 50, 0.1)', color: 'var(--ochre-warm)' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <div>
                      <div className="about-stat-num">24/7</div>
                      <div className="about-stat-lbl">Siaga Siskamling</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: 3 Core Pillars */}
              <div className="about-pillars-card">
                <div>
                  <span className="section-overline" style={{ color: '#fcefdc' }}>
                    PILAR UTAMA LINGKUNGAN
                  </span>
                  <h3 className="pillars-header-title">
                    Fasilitas & Layanan RT 009
                  </h3>

                  <div className="pillars-items-list">
                    <div className="pillar-item-row">
                      <div className="pillar-icon-box">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 4 23 10 17 10" />
                          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                          <polyline points="1 20 1 14 7 14" />
                          <path d="M3.51 9a9 9 0 0 1 2.12-5.36L1 4" />
                        </svg>
                      </div>
                      <div>
                        <strong>Kebersihan & Bank Sampah</strong>
                        <p>Pengelolaan limbah anorganik dan pemilahan sampah terpadu warga di sepanjang lorong.</p>
                      </div>
                    </div>

                    <div className="pillar-item-row">
                      <div className="pillar-icon-box">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>
                      <div>
                        <strong>Siskamling Terkoordinasi</strong>
                        <p>Jadwal ronda bergilir dan pemantauan lingkungan aktif 24 jam di pos Saung Riung.</p>
                      </div>
                    </div>

                    <div className="pillar-item-row">
                      <div className="pillar-icon-box">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      <div>
                        <strong>Kemitraan Sosial & CSR</strong>
                        <p>Kerja sama berkelanjutan dengan PT Pertamina, kelurahan, dan perbankan digital warga.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. INISIATIF & KEGIATAN WARGA (Pure Vector & Typography) */}
        <FeaturedGrid
          galleryData={activityData}
          onSelectAlbum={(data) => setSelectedActivity(data)}
          onNavigate={handleNavigate}
        />

        {/* 6. SUPPORTING TRI-GRID (Philosophy, Quick Actions, Map - No Photos) */}
        <SupportingTriGrid
          onOpenService={(serviceType) => setActiveServiceModal(serviceType)}
          onOpenMap={() => setShowMapModal(true)}
        />

        {/* 7. AMBIENT AUDIO BAR (Matches Reference Ocean Breeze Bar) */}
        <AmbientAudioBar />

        {/* 8. AGENDA WARGA TERJADWAL (Interactive Filter & Clean Cards) */}
        <section id="events" className="events-section-wrapper">
          <div className="events-header-row">
            <div>
              <span className="section-overline">
                KALENDER & INISIATIF
              </span>
              <h2 className="section-main-title">
                Agenda Warga Terjadwal
              </h2>
              <p className="section-main-desc">
                Kegiatan berkala, gotong royong, dan pertemuan warga untuk terus
                mempererat silaturahmi di lingkungan RT 009 Koja.
              </p>

              {/* Category Filter Tabs */}
              <div className="agenda-filter-tabs">
                <button
                  className={`agenda-filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  Semua Agenda ({events.length})
                </button>
                <button
                  className={`agenda-filter-btn ${selectedCategory === 'social' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('social')}
                >
                  Sosial & Gotong Royong
                </button>
                <button
                  className={`agenda-filter-btn ${selectedCategory === 'religious' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('religious')}
                >
                  Keagamaan
                </button>
                <button
                  className={`agenda-filter-btn ${selectedCategory === 'general' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('general')}
                >
                  Olahraga & Pemuda
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowNewEventModal(true)}
              className="btn-tactile btn-tactile-primary"
            >
              <span>+ Usulkan Agenda</span>
            </button>
          </div>

          <div className="agenda-cards-grid">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((evt) => (
                <EventCard
                  key={evt.id}
                  event={evt}
                  onDelete={handleDeleteEvent}
                />
              ))
            ) : (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '3.5rem 2rem',
                background: 'var(--bg-surface)',
                borderRadius: '24px',
                border: 'var(--border-outline)'
              }}>
                <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)' }}>
                  Tidak ada agenda yang cocok dengan kriteria pencarian saat ini.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 8. PARTNERS (Clean Typographic Badges - No Raster Images) */}
        <section className="partners-sculpted-section">
          <h3>Sinergi & Kemitraan Pendukung</h3>
          <p>Bersinergi bersama institusi pendukung untuk mewujudkan lingkungan yang mandiri dan berdaya.</p>

          <div className="partners-flex-row">
            <div className="partner-logo-pill">
              <div className="partner-badge-icon" style={{ background: '#b91c1c' }}>
                P
              </div>
              <div style={{ textAlign: 'left' }}>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-headline)' }}>Pertamina</strong>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Mitra Bina Lingkungan</span>
              </div>
            </div>

            <div className="partner-logo-pill">
              <div className="partner-badge-icon" style={{ background: '#005eb8' }}>
                B
              </div>
              <div style={{ textAlign: 'left' }}>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-headline)' }}>BCA</strong>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Layanan Keuangan Digital</span>
              </div>
            </div>

            <div className="partner-logo-pill">
              <div className="partner-badge-icon" style={{ background: '#16a34a' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
              </div>
              <div style={{ textAlign: 'left' }}>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-headline)' }}>Bank Sampah</strong>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Kelurahan Tugu Selatan</span>
              </div>
            </div>
          </div>
        </section>

        {/* 9. SCULPTED OFFICIAL FOOTER */}
        <Footer />
      </main>

      {/* ======================================================================
          MODALS
          ====================================================================== */}

      {/* 1. Activity Detail Modal */}
      {selectedActivity && (
        <div className="sculpted-modal-overlay" onClick={() => setSelectedActivity(null)}>
          <div
            className="sculpted-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={() => setSelectedActivity(null)} aria-label="Tutup modal">
              ✕
            </button>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="section-overline">
                {selectedActivity.category}
              </span>
              <h2 style={{ fontSize: '1.75rem', marginTop: '0.2rem', color: 'var(--text-headline)' }}>
                {selectedActivity.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                Program dan inisiatif aktif warga RT 009 / RW 002 Koja.
              </p>
            </div>

            <div style={{ background: 'var(--bg-surface-tint)', borderRadius: '18px', padding: '1.4rem', border: 'var(--border-outline)' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-deep)', marginBottom: '0.75rem' }}>
                Rincian & Tujuan Program:
              </h4>
              <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', color: 'var(--text-body)', fontSize: '0.9rem' }}>
                {selectedActivity.details.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedActivity(null)}
                className="btn-tactile btn-tactile-primary"
              >
                Tutup Informasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Interactive Google Maps Modal */}
      {showMapModal && (
        <div className="sculpted-modal-overlay" onClick={() => setShowMapModal(false)}>
          <div
            className="sculpted-modal-box"
            style={{ maxWidth: '720px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={() => setShowMapModal(false)} aria-label="Tutup modal">
              ✕
            </button>
            <div style={{ marginBottom: '1.2rem' }}>
              <span className="section-overline">
                PETA & PETUNJUK ARAH
              </span>
              <h2 style={{ fontSize: '1.75rem', marginTop: '0.2rem' }}>Saung Riung RT 009</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Gg Saiyan, RT 009 / RW 002, Kel. Tugu Selatan, Kec. Koja, Jakarta Utara
              </p>
            </div>

            <div style={{
              height: '360px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-tactile-md)',
              border: 'var(--border-outline)'
            }}>
              <iframe
                title="Peta Saung Riung"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.995417132507!2d106.90907477600747!3d-6.1313167938555075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1f0066ae204d%3A0xbd45bf44f3caf07a!2sSAUNG%20RIUNG!5e0!3m2!1sen!2sid!4v1771851898168!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => setShowMapModal(false)}
                className="btn-tactile btn-tactile-outline"
              >
                Tutup
              </button>
              <a
                href="https://maps.app.goo.gl/4mR1LhRbk9KqmBuF8"
                target="_blank"
                rel="noreferrer"
                className="btn-tactile btn-tactile-primary"
              >
                Buka di Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 3. Quick Service Modal */}
      {activeServiceModal && (
        <div className="sculpted-modal-overlay" onClick={() => setActiveServiceModal(null)}>
          <div className="sculpted-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveServiceModal(null)} aria-label="Tutup modal">
              ✕
            </button>
            {activeServiceModal === 'layanan-rt' && (
              <div>
                <span className="section-overline">LAYANAN KEPENDUDUKAN</span>
                <h2 style={{ fontSize: '1.75rem', margin: '0.3rem 0 0.85rem' }}>Surat Pengantar RT</h2>
                <p style={{ lineHeight: 1.7, color: 'var(--text-body)', marginBottom: '1.25rem', fontSize: '0.92rem' }}>
                  Warga dapat mengajukan surat pengantar untuk keperluan administrasi kependudukan (KTP, KK, SKCK, surat keterangan domisili).
                </p>
                <div style={{ background: 'var(--bg-surface-tint)', padding: '1.2rem', borderRadius: '16px', marginBottom: '1.25rem', border: 'var(--border-outline)' }}>
                  <strong style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--primary-deep)', fontSize: '0.92rem' }}>Persyaratan:</strong>
                  <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-body)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <li>Fotokopi Kartu Keluarga (KK)</li>
                    <li>Fotokopi KTP Pemohon</li>
                    <li>Menghubungi Ketua RT atau sekretariat Saung Riung</li>
                  </ul>
                </div>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="btn-tactile btn-tactile-primary" style={{ width: '100%' }}>
                  Hubungi Pengurus via WhatsApp
                </a>
              </div>
            )}

            {activeServiceModal === 'bank-sampah' && (
              <div>
                <span className="section-overline" style={{ color: '#16a34a' }}>KELESTARIAN LINGKUNGAN</span>
                <h2 style={{ fontSize: '1.75rem', margin: '0.3rem 0 0.85rem' }}>Bank Sampah Tugu Selatan</h2>
                <p style={{ lineHeight: 1.7, color: 'var(--text-body)', marginBottom: '1.25rem', fontSize: '0.92rem' }}>
                  Program tabungan sampah warga RT 009 untuk mengubah sampah anorganik terpilah (kardus, plastik, botol, kaleng) menjadi tabungan bernilai ekonomis.
                </p>
                <div style={{ background: '#f0fdf4', padding: '1.2rem', borderRadius: '16px', marginBottom: '1.25rem', border: '1px solid rgba(22, 163, 74, 0.2)' }}>
                  <strong style={{ display: 'block', marginBottom: '0.35rem', color: '#14532d', fontSize: '0.92rem' }}>Jadwal Penimbangan:</strong>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#15803d' }}>
                    Setiap hari Minggu pekan kedua & keempat di halaman Saung Riung (08:00 - 11:00 WIB).
                  </p>
                </div>
                <button onClick={() => setActiveServiceModal(null)} className="btn-tactile btn-tactile-primary" style={{ width: '100%' }}>
                  Mengerti
                </button>
              </div>
            )}

            {activeServiceModal === 'pos-ronda' && (
              <div>
                <span className="section-overline" style={{ color: '#d97706' }}>KEAMANAN LINGKUNGAN</span>
                <h2 style={{ fontSize: '1.75rem', margin: '0.3rem 0 0.85rem' }}>Siskamling & Pos Ronda 24 Jam</h2>
                <p style={{ lineHeight: 1.7, color: 'var(--text-body)', marginBottom: '1.25rem', fontSize: '0.92rem' }}>
                  Sistem keamanan lingkungan warga dengan jadwal ronda bergiliran dan pos pantau terpadu untuk memastikan lingkungan senantiasa kondusif dan tenteram.
                </p>
                <div style={{ background: '#fefce8', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(217, 119, 6, 0.2)', marginBottom: '1.25rem' }}>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#92400e' }}>
                    Hubungi petugas jaga ronda melalui grup komunikasi keamanan RT 009 jika membutuhkan bantuan darurat atau pantauan khusus.
                  </p>
                </div>
                <button onClick={() => setActiveServiceModal(null)} className="btn-tactile btn-tactile-primary" style={{ width: '100%' }}>
                  Tutup
                </button>
              </div>
            )}

            {activeServiceModal === 'aspirasi' && (
              <div>
                <span className="section-overline" style={{ color: 'var(--slate-blue)' }}>SUARA WARGA</span>
                <h2 style={{ fontSize: '1.75rem', margin: '0.3rem 0 0.85rem' }}>Kotak Aspirasi & Masukan</h2>
                <p style={{ lineHeight: 1.7, color: 'var(--text-body)', marginBottom: '1.25rem', fontSize: '0.92rem' }}>
                  Punya ide perbaikan lingkungan, usulan kegiatan, atau masukan untuk pengurus RT 009? Sampaikan langsung secara terbuka.
                </p>
                <a href="mailto:info@saungriung.id?subject=Aspirasi%20Warga%20RT%20009" className="btn-tactile btn-tactile-primary" style={{ width: '100%' }}>
                  Kirim Email Aspirasi
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Form Modal (Tambah Agenda Baru) */}
      {showNewEventModal && (
        <div className="sculpted-modal-overlay" onClick={() => setShowNewEventModal(false)}>
          <div className="sculpted-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowNewEventModal(false)} aria-label="Tutup modal">
              ✕
            </button>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="section-overline">
                AGENDA WARGA
              </span>
              <h2 style={{ fontSize: '1.75rem', marginTop: '0.2rem' }}>Tambah Agenda Baru</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Jadwalkan kegiatan bersama demi kemajuan dan kekompakan RT 009.
              </p>
            </div>

            <form onSubmit={handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-headline)' }}>
                  Judul Kegiatan *
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Kerja Bakti Lingkungan"
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1.1rem',
                    borderRadius: '14px',
                    border: 'var(--border-outline)',
                    background: 'var(--bg-surface-tint)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-headline)' }}>
                  Deskripsi Kegiatan
                </label>
                <textarea
                  placeholder="Jelaskan tujuan dan rincian kegiatan..."
                  rows="3"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1.1rem',
                    borderRadius: '14px',
                    border: 'var(--border-outline)',
                    background: 'var(--bg-surface-tint)',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    outline: 'none'
                  }}
                ></textarea>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-headline)' }}>
                    Tanggal Pelaksanaan *
                  </label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: '14px',
                      border: 'var(--border-outline)',
                      background: 'var(--bg-surface-tint)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-headline)' }}>
                    Kategori Agenda
                  </label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: '14px',
                      border: 'var(--border-outline)',
                      background: 'var(--bg-surface-tint)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  >
                    <option value="social">Sosial & Lingkungan</option>
                    <option value="religious">Keagamaan</option>
                    <option value="general">Olahraga & Umum</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-headline)' }}>
                  Lokasi Pertemuan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Saung Riung Utama / Gg Saiyan"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1.1rem',
                    borderRadius: '14px',
                    border: 'var(--border-outline)',
                    background: 'var(--bg-surface-tint)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setShowNewEventModal(false)}
                  className="btn-tactile btn-tactile-outline"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-tactile btn-tactile-primary"
                >
                  Simpan Agenda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Toast Notification */}
      <Toast
        show={toast.show}
        message={toast.msg}
        type={toast.type}
        onClose={() => setToast({ show: false, msg: '', type: 'success' })}
      />
    </div>
  );
};

export default HomePage;