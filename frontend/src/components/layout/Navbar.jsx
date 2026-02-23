import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false); // Tutup menu mobile jika terbuka
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <span>Saung</span>Riung
                </div>
                
                <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li><button onClick={() => scrollToSection('home')} className="nav-btn">Beranda</button></li>
                    <li><button onClick={() => scrollToSection('about')} className="nav-btn">Tentang</button></li>
                    <li><button onClick={() => scrollToSection('gallery')} className="nav-btn">Galeri</button></li>
                    <li><button onClick={() => scrollToSection('events')} className="nav-btn">Kegiatan</button></li>
                    <li><button onClick={() => scrollToSection('structure')} className="nav-btn">Tim</button></li>
                    <li><button onClick={() => scrollToSection('contact')} className="btn-nav contact-btn">Hubungi Kami</button></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
