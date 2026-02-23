import React from 'react';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <span className="badge">RT 009 / RW 002</span>
                <h1>Membangun Kebersamaan<br />Untuk Kemajuan Lingkungan</h1>
                <p>Selamat datang di website resmi Saung Riung. Wadah pemuda dan warga untuk berkarya, berinovasi, dan bersinergi.</p>
                <div className="hero-actions">
                    <a href="#events" className="btn btn-primary">Lihat Kegiatan</a>
                    <a href="#about" className="btn btn-outline">Tentang Kami</a>
                </div>
            </div>
            <div className="hero-decoration">
                <div className="circle-1"></div>
                <div className="circle-2"></div>
            </div>
        </section>
    );
};

export default Hero;
