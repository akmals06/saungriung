import React from 'react';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            
            <div className="container">
                <div className="hero-grid">
                    <div className="hero-text">
                        <span className="hero-badge">RT 009 / RW 002 KOJA</span>
                        <h1>Harmoni Warga,<br /><span className="text-gradient">Sinergi Bersama.</span></h1>
                        <p>
                            Pusat informasi dan kegiatan warga RT 009. Menjaga kerukunan, 
                            keamanan, dan transparansi lingkungan kita bersama.
                        </p>
                        <div className="hero-actions" style={{display: 'flex', gap: '1.5rem', marginTop: '2rem'}}>
                            <a href="#events" className="btn btn-primary" style={{padding: '1rem 2.5rem', fontSize: '1rem', boxShadow: '0 10px 25px -5px rgba(15, 57, 43, 0.4)'}}>
                                Jelajahi Agenda
                            </a>
                            <a href="#about" className="btn" style={{
                                background: 'transparent', 
                                border: '2px solid #0f392b', 
                                color: '#0f392b',
                                padding: '1rem 2.5rem',
                                fontSize: '1rem'
                            }}>
                                Pelajari Kami
                            </a>
                        </div>
                    </div>
                    
                    <div className="hero-visual float-slow" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="hero-img-card" style={{ maxWidth: '350px', width: '100%' }}>
                            <img 
                                src="/images/main-img.png" 
                                alt="Saung Riung Optimized" 
                                style={{width: '100%', height: 'auto', display: 'block'}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
