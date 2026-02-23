import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import Footer from '../components/layout/Footer';
import EventCard from '../components/EventCard';
import Toast from '../components/ui/Toast';
import { getEvents, createEvent, deleteEvent } from '../services/api';

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    // Dummy Gallery Data
    const galleryData = {
        futsal: {
            title: "Saung Riung Futsal Cup",
            photos: [
                "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1526232387709-b04cfcc75fd9?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80"
            ]
        },
        pertamina: {
            title: "Kunjungan Pertamina",
            photos: [
                "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
            ]
        },
        gowes: {
            title: "Gowes Sehat Bersama",
            photos: [
                "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1618176581827-e437c37cd685?auto=format&fit=crop&w=800&q=80"
            ]
        },
        kerjabakti: {
            title: "Kerja Bakti Lingkungan",
            photos: [
                "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1617450365226-9bf28c5d66c6?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
            ]
        }
    };
    
    // Form State
    const [newEvent, setNewEvent] = useState({ 
        title: '', 
        description: '', 
        date: '', 
        location: '', 
        type: 'general' 
    });

    useEffect(() => {
        loadEvents();
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el));
    }, []);

    const showToast = (msg, type = 'success') => {
        setToast({ show: true, msg, type });
        setTimeout(() => setToast({ ...toast, show: false }), 3000);
    };

    const loadEvents = async () => {
        try {
            const res = await getEvents();
            if (res.success) {
                const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setEvents(sorted);
            }
        } catch (error) {
            console.error("Failed to load events", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const res = await createEvent(newEvent);
        if (res.success) {
            setEvents([res.data, ...events]);
            setNewEvent({ title: '', description: '', date: '', location: '', type: 'general' });
            setShowModal(false);
            showToast('Agenda berhasil dibuat!', 'success');
        } else {
            showToast('Gagal membuat agenda: ' + (res.message || 'Error'), 'error');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Hapus agenda ini?')) return;
        
        try {
            await deleteEvent(id);
            setEvents(events.filter(e => e.id !== id));
            showToast('Agenda berhasil dihapus.', 'info');
        } catch (error) {
            showToast('Gagal menghapus agenda.', 'error');
        }
    };

    return (
        <div style={{position: 'relative', overflow: 'hidden'}}>
            <Navbar />
            
            <Hero />

            {/* About Section */}
            <section id="about" className="reveal-up" style={{ padding: '8rem 0', position: 'relative' }}>
                <div className="container">
                    <div className="glass-panel" style={{padding: '4rem', position: 'relative', overflow: 'hidden'}}>
                        {/* Decorative Circle */}
                        <div style={{
                            position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px',
                            background: 'radial-gradient(circle, rgba(212,163,115,0.2) 0%, transparent 70%)', borderRadius: '50%'
                        }}></div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                            <div>
                                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                                    Membangun <span className="text-gradient">Harmoni</span>,<br/>
                                    Menciptakan Keamanan.
                                </h2>
                                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#4a5568', marginBottom: '2.5rem' }}>
                                    Saung Riung RT 009/002 adalah wujud nyata transformasi digital komunitas warga. 
                                    Kami menghubungkan setiap aspirasi menjadi aksi nyata demi lingkungan yang lebih baik.
                                </p>
                                
                                {/* Stats Mini Cards */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div style={{
                                        background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.6)',
                                        borderRadius: '16px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                                    }}>
                                        <div style={{
                                            background: 'rgba(15, 57, 43, 0.1)', color: '#0f392b',
                                            width: '50px', height: '50px', borderRadius: '12px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.8rem', color: '#0f392b', margin: 0, lineHeight: 1 }}>50+</h3>
                                            <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>Kepala Keluarga</p>
                                        </div>
                                    </div>

                                    <div style={{
                                        background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.6)',
                                        borderRadius: '16px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                                    }}>
                                        <div style={{
                                            background: 'rgba(212, 163, 115, 0.1)', color: '#d4a373',
                                            width: '50px', height: '50px', borderRadius: '12px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.8rem', color: '#d4a373', margin: 0, lineHeight: 1 }}>24/7</h3>
                                            <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>Siaga Keamanan</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ 
                                height: '350px', 
                                borderRadius: '24px',
                                backgroundImage: 'url(/images/harmoni-final.png)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)'
                            }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="reveal-up" style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div style={{textAlign: 'center', marginBottom: '4rem'}}>
                        <h2 style={{fontSize: '2.5rem', marginBottom: '0.5rem'}} className="text-gradient">Galeri Kegiatan</h2>
                        <p style={{color: '#64748b'}}>Momen kebersamaan yang tak terlupakan.</p>
                    </div>

                    <div style={{
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                        gridAutoRows: '250px',
                        gap: '1.5rem'
                    }}>
                        <div style={{
                            gridColumn: 'span 2', gridRow: 'span 2', 
                            borderRadius: '24px', overflow: 'hidden', position: 'relative', cursor: 'pointer'
                        }} className="gallery-item" onClick={() => setSelectedAlbum(galleryData.futsal)}>
                            <img src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80" 
                                 alt="Futsal" 
                                 style={{width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s'}} 
                            />
                            <div className="overlay">
                                <h3>Saung Riung Futsal Cup</h3>
                                <p>Olahraga & Sportivitas</p>
                            </div>
                        </div>

                        <div style={{
                            borderRadius: '24px', overflow: 'hidden', position: 'relative', cursor: 'pointer'
                        }} className="gallery-item" onClick={() => setSelectedAlbum(galleryData.pertamina)}>
                            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80" 
                                 alt="Pertamina" 
                                 style={{width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s'}} 
                            />
                            <div className="overlay">
                                <h3>Kunjungan Pertamina</h3>
                                <p>Kolaborasi Strategis</p>
                            </div>
                        </div>

                        <div style={{
                            gridRow: 'span 2',
                            borderRadius: '24px', overflow: 'hidden', position: 'relative', cursor: 'pointer'
                        }} className="gallery-item" onClick={() => setSelectedAlbum(galleryData.gowes)}>
                            <img src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=600&q=80" 
                                 alt="Gowes" 
                                 style={{width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s'}} 
                            />
                            <div className="overlay">
                                <h3>Gowes Sehat</h3>
                                <p>Minggu Ceria</p>
                            </div>
                        </div>

                        <div style={{
                            borderRadius: '24px', overflow: 'hidden', position: 'relative', cursor: 'pointer'
                        }} className="gallery-item" onClick={() => setSelectedAlbum(galleryData.kerjabakti)}>
                            <img src="https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=600&q=80" 
                                 alt="Kerja Bakti" 
                                 style={{width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s'}} 
                            />
                            <div className="overlay">
                                <h3>Kerja Bakti</h3>
                                <p>Lingkungan Bersih</p>
                            </div>
                        </div>
                    </div>
                    <style>{`
                        .gallery-item:hover img { transform: scale(1.1); }
                        .overlay {
                            position: absolute; bottom: 0; left: 0; width: 100%;
                            padding: 2rem;
                            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
                            color: white;
                            opacity: 0; transform: translateY(20px);
                            transition: 0.4s ease;
                        }
                        .gallery-item:hover .overlay { opacity: 1; transform: translateY(0); }
                        .overlay h3 { color: white; margin: 0; font-size: 1.2rem; }
                        .overlay p { color: rgba(255,255,255,0.8); margin: 5px 0 0; font-size: 0.9rem; }
                        @media (max-width: 768px) {
                            .gallery-item { grid-column: span 1 !important; grid-row: span 1 !important; height: 250px; }
                        }
                    `}</style>
                </div>
            </section>

            {/* Events Section */}
            <section id="events" className="reveal-up" style={{ padding: '6rem 0 8rem' }}>
                <div className="container">
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '5rem'
                    }}>
                        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }} className="text-gradient">
                            Agenda Warga
                        </h2>
                        <p style={{ 
                            color: '#64748b', fontSize: '1.2rem', maxWidth: '600px', lineHeight: 1.6, marginBottom: '2.5rem'
                        }}>
                            Simak dan ikuti berbagai kegiatan seru untuk mempererat silaturahmi 
                            serta membangun lingkungan yang lebih aktif dan positif.
                        </p>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                            <div className="spinner" style={{width: '40px', height: '40px', border: '4px solid rgba(15, 57, 43, 0.1)', borderTop: '4px solid #0f392b', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem'}}></div>
                            <p>Sedang memuat agenda...</p>
                            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                        </div>
                    ) : (
                        <div className="event-grid">
                            {events.length > 0 ? (
                                events.map(event => (
                                    <EventCard key={event.id} event={event} onDelete={handleDelete} />
                                ))
                            ) : (
                                <div className="glass-panel" style={{ 
                                    gridColumn: '1/-1', textAlign: 'center', padding: '5rem 2rem',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                    background: 'rgba(255,255,255,0.6)'
                                }}>
                                    <div style={{
                                        width: '80px', height: '80px', background: 'rgba(15, 57, 43, 0.05)', 
                                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginBottom: '1.5rem', color: '#0f392b'
                                    }}>
                                        <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 style={{fontSize: '1.5rem', color: '#1e293b', marginBottom: '0.5rem'}}>Belum ada agenda terjadwal</h3>
                                    <p style={{color: '#64748b', maxWidth: '400px', margin: '0 auto', lineHeight: '1.6'}}>
                                        Saat ini belum ada kegiatan yang dijadwalkan. Jadilah inisiator pertama untuk kegiatan positif di lingkungan kita!
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Partners Section */}
            <section className="reveal-up" style={{ padding: '4rem 0', background: 'rgba(255,255,255,0.5)' }}>
                <div className="container">
                    <div style={{textAlign: 'center', marginBottom: '3rem'}}>
                        <h2 style={{fontSize: '2rem', marginBottom: '0.5rem', color: '#0f392b'}}>Kolaborasi & Mitra</h2>
                        <p style={{color: '#d4a373', fontStyle: 'italic'}}>Bersinergi membangun lingkungan yang berkelanjutan.</p>
                    </div>

                    <div style={{
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                        gap: '3rem',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        {/* Pertamina (Red) */}
                        <div className="liger-wrapper" style={{'--bg-start': '#ed1c24', '--bg-end': '#991b1b', '--shadow-color': 'rgba(237, 28, 36, 0.4)'}}>
                            <div className="liger-card">
                                <div className="liger-circles">
                                    <span className="liger-circle c1"></span>
                                    <span className="liger-circle c2"></span>
                                    <span className="liger-circle c3"></span>
                                    <span className="liger-circle c4"></span>
                                    <span className="liger-circle c5">
                                        <img src="/images/logo-pertamina.png" alt="Pertamina" />
                                    </span>
                                </div>
                                <div className="liger-glass"></div>
                                <div className="liger-content">
                                    <span className="liger-title">PERTAMINA</span>
                                    <span className="liger-text">Official Partner. Energi untuk negeri.</span>
                                </div>
                            </div>
                        </div>

                        {/* BCA (Blue) */}
                        <div className="liger-wrapper" style={{'--bg-start': '#005eb8', '--bg-end': '#003366', '--shadow-color': 'rgba(0, 94, 184, 0.4)'}}>
                            <div className="liger-card">
                                <div className="liger-circles">
                                    <span className="liger-circle c1"></span>
                                    <span className="liger-circle c2"></span>
                                    <span className="liger-circle c3"></span>
                                    <span className="liger-circle c4"></span>
                                    <span className="liger-circle c5">
                                        <img src="/images/logo-bca.png" alt="BCA" style={{objectFit: 'contain', width: '45px'}} />
                                    </span>
                                </div>
                                <div className="liger-glass"></div>
                                <div className="liger-content">
                                    <span className="liger-title">BCA</span>
                                    <span className="liger-text">Digital Banking. Senantiasa di sisi Anda.</span>
                                </div>
                            </div>
                        </div>

                        {/* Bank Sampah (Green) */}
                        <div className="liger-wrapper" style={{'--bg-start': '#16a34a', '--bg-end': '#14532d', '--shadow-color': 'rgba(22, 163, 74, 0.4)'}}>
                            <div className="liger-card">
                                <div className="liger-circles">
                                    <span className="liger-circle c1"></span>
                                    <span className="liger-circle c2"></span>
                                    <span className="liger-circle c3"></span>
                                    <span className="liger-circle c4"></span>
                                    <span className="liger-circle c5">
                                        <img src="/images/logo-banksampah.png" alt="Bank Sampah" />
                                    </span>
                                </div>
                                <div className="liger-glass"></div>
                                <div className="liger-content">
                                    <span className="liger-title">Bank Sampah</span>
                                    <span className="liger-text">Kelurahan Tugu Selatan. Lingkungan bersih.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Album Modal */}
            {selectedAlbum && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(5, 25, 18, 0.9)', 
                    backdropFilter: 'blur(10px)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000,
                    animation: 'float 0.4s ease'
                }} onClick={() => setSelectedAlbum(null)}>
                    <div style={{ 
                        width: '90%', maxWidth: '1000px', maxHeight: '90vh', overflowY: 'auto',
                        background: 'transparent', padding: '2rem', borderRadius: '24px'
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', color: 'white'}}>
                            <h2 style={{margin: 0, color: 'white'}}>{selectedAlbum.title}</h2>
                            <button onClick={() => setSelectedAlbum(null)} style={{background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', color: 'white', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>×</button>
                        </div>
                        
                        <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'
                        }}>
                            {selectedAlbum.photos.map((photo, idx) => (
                                <div key={idx} style={{borderRadius: '16px', overflow: 'hidden', height: '250px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)'}}>
                                    <img src={photo} alt={`Foto ${idx+1}`} style={{width: '100%', height: '100%', objectFit: 'cover', transition: '0.3s', cursor: 'zoom-in'}} 
                                         onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                         onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Form Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(5, 25, 18, 0.6)', 
                    backdropFilter: 'blur(8px)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000,
                    animation: 'float 0.5s ease'
                }}>
                    <div className="glass-panel" style={{ padding: '2.5rem', width: '100%', maxWidth: '500px', background: 'white' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                            <h3 style={{fontSize: '1.5rem'}}>Agenda Baru</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                        </div>
                        
                        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <input 
                                type="text" placeholder="Judul Kegiatan" required 
                                value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                                style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                            />
                            
                            <textarea 
                                placeholder="Deskripsi Singkat" rows="3"
                                value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                                style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontFamily: 'inherit' }}
                            ></textarea>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input 
                                    type="date" required 
                                    value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                                    style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                                />
                                <select 
                                    value={newEvent.type} onChange={e => setNewEvent({...newEvent, type: e.target.value})}
                                    style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                                >
                                    <option value="general">Umum</option>
                                    <option value="social">Sosial</option>
                                    <option value="religious">Keagamaan</option>
                                </select>
                            </div>

                            <input 
                                type="text" placeholder="Lokasi (cth: Lapangan RT)" 
                                value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                                style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                            />

                            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
                                Simpan Agenda
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Toast Container */}
            {toast.show && <Toast message={toast.msg} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}

            <Footer />
        </div>
    );
};

export default HomePage;