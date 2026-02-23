import React from 'react';

const Footer = () => {
    return (
        <footer id="contact" className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>Saung Riung</h3>
                        <p>Wadah aspirasi dan kreasi warga RT 009/002. Bersama membangun lingkungan yang harmonis dan religius.</p>
                    </div>
                    <div className="footer-links">
                        <h4>Navigasi</h4>
                        <ul>
                            <li><a href="#home">Beranda</a></li>
                            <li><a href="#about">Tentang Kami</a></li>
                            <li><a href="#events">Agenda Kegiatan</a></li>
                            <li><a href="#structure">Struktur Organisasi</a></li>
                        </ul>
                    </div>
                    <div className="footer-contact">
                        <h4>Hubungi Kami</h4>
                        <ul>
                            <li>📧 info@saungriung.id</li>
                            <li>📞 +62 812-3456-7890</li>
                            <li>📍 Gg Saiyan, RT.09/02 Kec. Koja, Kota Jkt Utara, DKI Jakarta, 14260</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Saung Riung. Hak Cipta Dilindungi.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
