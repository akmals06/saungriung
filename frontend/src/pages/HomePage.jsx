import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import Footer from '../components/layout/Footer';
import EventCard from '../components/EventCard';
import { getEvents, createEvent, deleteEvent } from '../services/api';

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '', type: 'general' });

    useEffect(() => {
        loadEvents();
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        
        document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    }, []);

    useEffect(() => {
        if (filter === 'all') {
            setFilteredEvents(events);
        } else {
            setFilteredEvents(events.filter(e => e.type === filter));
        }
    }, [filter, events]);

    const loadEvents = async () => {
        try {
            const res = await getEvents();
            if (res.success) {
                setEvents(res.data);
                setFilteredEvents(res.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const res = await createEvent(newEvent);
        if (res.success) {
            const updatedEvents = [...events, res.data];
            setEvents(updatedEvents);
            setNewEvent({ title: '', description: '', date: '', location: '', type: 'general' });
            setShowForm(false);
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm('Hapus agenda ini?')) {
            await deleteEvent(id);
            setEvents(events.filter(e => e.id !== id));
        }
    };

    return (
        <div className="app-container">
            <Navbar />
            
            <div id="home">
                <Hero />
            </div>

            {/* Introduction / About */}
            <section id="about" className="section-padding reveal-on-scroll">
                <div className="container fluid-grid">
                    <div className="text-content">
                        <span className="accent-label">Filosofi Kami</span>
                        <h2 className="heading-lg">Harmoni dalam<br/>Keberagaman Warga</h2>
                        <p className="body-text">
                            Saung Riung bukan sekadar organisasi, melainkan rumah bagi aspirasi warga RT 009/002. 
                            Kami percaya bahwa lingkungan yang sehat dimulai dari interaksi yang hangat antar tetangga.
                        </p>
                        <div className="stats-row">
                            <div className="stat-item">
                                <span className="stat-number">2020</span>
                                <span className="stat-label">Tahun Berdiri</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Kegiatan Aktif</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">100%</span>
                                <span className="stat-label">Dedikasi</span>
                            </div>
                        </div>
                    </div>
                    <div className="image-content">
                        <div className="image-blob"></div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="section-padding bg-cream reveal-on-scroll">
                <div className="container">
                    <div className="header-center">
                        <h2 className="heading-md">Momen Kebersamaan</h2>
                        <p className="body-text-center">Jejak visual dari setiap langkah kecil kami.</p>
                    </div>
                    <div className="mosaic-grid">
                        <div className="mosaic-item h-2" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80)'}}></div>
                        <div className="mosaic-item h-1" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80)'}}></div>
                        <div className="mosaic-item h-1" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80)'}}></div>
                        <div className="mosaic-item h-2" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80)'}}></div>
                        <div className="mosaic-item h-1 w-2" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80)'}}></div>
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section id="events" className="section-padding reveal-on-scroll">
                <div className="container">
                    <div className="header-spread">
                        <div>
                            <h2 className="heading-md">Agenda Warga</h2>
                            <p className="body-text">Jadwal kegiatan mendatang.</p>
                        </div>
                        <button className="btn-icon-text" onClick={() => setShowForm(!showForm)}>
                            <span>+ Buat Agenda</span>
                        </button>
                    </div>

                    <div className="tabs-pill">
                        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Semua</button>
                        <button className={filter === 'general' ? 'active' : ''} onClick={() => setFilter('general')}>Umum</button>
                        <button className={filter === 'social' ? 'active' : ''} onClick={() => setFilter('social')}>Sosial</button>
                        <button className={filter === 'religious' ? 'active' : ''} onClick={() => setFilter('religious')}>Keagamaan</button>
                    </div>

                    {showForm && (
                        <div className="modal-backdrop">
                            <div className="modal-card">
                                <div className="modal-header">
                                    <h3>Agenda Baru</h3>
                                    <button onClick={() => setShowForm(false)}>✕</button>
                                </div>
                                <form onSubmit={handleCreate}>
                                    <div className="input-group">
                                        <input type="text" placeholder="Nama Kegiatan" required 
                                            value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
                                    </div>
                                    <div className="input-group">
                                        <textarea placeholder="Deskripsi Singkat" required rows="3"
                                            value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})}></textarea>
                                    </div>
                                    <div className="grid-2">
                                        <input type="date" required value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
                                        <select value={newEvent.type} onChange={e => setNewEvent({...newEvent, type: e.target.value})}>
                                            <option value="general">Umum</option>
                                            <option value="social">Sosial</option>
                                            <option value="religious">Keagamaan</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <input type="text" placeholder="Lokasi" required
                                            value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
                                    </div>
                                    <button type="submit" className="btn-primary full-width">Simpan</button>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="cards-wrapper">
                        {loading ? (
                            <div className="skeleton-loader"></div>
                        ) : filteredEvents.length > 0 ? (
                            filteredEvents.map(event => (
                                <EventCard key={event.id} event={event} onDelete={handleDelete} />
                            ))
                        ) : (
                            <div className="empty-zone">
                                <p>Belum ada agenda dalam kategori ini.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Structure - Team Section */}
            <section id="structure" className="section-padding bg-dark reveal-on-scroll">
                <div className="container">
                    <div className="header-center text-light">
                        <span className="accent-label">Kepengurusan</span>
                        <h2 className="heading-md">Tim Penggerak</h2>
                    </div>
                    
                    {/* Leader Highlight */}
                    <div className="leader-spotlight">
                        <div className="leader-img"></div>
                        <div className="leader-info">
                            <h3>Bapak Maman Ardiman</h3>
                            <span className="role-badge">Ketua RT 009</span>
                            <p>Melayani warga dengan amanah, membangun lingkungan dengan hati.</p>
                        </div>
                    </div>

                    {/* Team Grid - Names and Photos cleared as requested */}
                    <div className="team-grid">
                        <div className="team-card empty-card">
                            <div className="team-avatar-placeholder"></div>
                            <span className="role-text">Sekretaris</span>
                        </div>
                        <div className="team-card empty-card">
                            <div className="team-avatar-placeholder"></div>
                            <span className="role-text">Bendahara</span>
                        </div>
                        <div className="team-card empty-card">
                            <div className="team-avatar-placeholder"></div>
                            <span className="role-text">Humas</span>
                        </div>
                        <div className="team-card empty-card">
                            <div className="team-avatar-placeholder"></div>
                            <span className="role-text">Pubdok</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HomePage;
