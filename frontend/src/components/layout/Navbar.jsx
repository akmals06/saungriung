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
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: "smooth"
            });
            setIsOpen(false);
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <span>Saung</span>Riung
            </div>
            
            <div className="nav-links">
                <span className="nav-link" onClick={() => scrollToSection('home')}>Beranda</span>
                <span className="nav-link" onClick={() => scrollToSection('about')}>Tentang</span>
                <span className="nav-link" onClick={() => scrollToSection('events')}>Agenda</span>
            </div>

            <button onClick={() => scrollToSection('contact')} className="btn btn-primary" style={{padding: '0.6rem 1.5rem', fontSize: '0.9rem'}}>
                Hubungi Kami
            </button>

            {/* Mobile Hamburger Logic (Hidden on Desktop via CSS) */}
            <div className="hamburger-trigger" onClick={() => setIsOpen(!isOpen)} style={{display: 'none'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </div>
        </nav>
    );
};

export default Navbar;
