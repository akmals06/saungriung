import React from 'react';

const Footer = () => {
    return (
        <footer id="contact" className="footer-elegant">
            <div className="container">
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem'}}>
                    <div>
                        <h3 className="logo" style={{color: 'white', marginBottom: '1rem'}}>
                            <span>Saung</span>Riung
                        </h3>
                        <p style={{opacity: 0.8, lineHeight: 1.8}}>
                            Membangun ekosistem warga yang harmonis, 
                            religius, dan modern melalui inovasi digital.
                        </p>
                    </div>
                    
                    <div>
                        <h4 style={{fontSize: '1.1rem', marginBottom: '1.5rem', borderBottom: '2px solid #d4a373', display: 'inline-block', paddingBottom: '5px', letterSpacing: '1px'}}>Navigasi</h4>
                        <ul style={{listStyle: 'none', padding: 0}}>
                            <li style={{marginBottom: '0.8rem'}}>
                                <a href="#home" className="footer-link">Beranda</a>
                            </li>
                            <li style={{marginBottom: '0.8rem'}}>
                                <a href="#about" className="footer-link">Tentang Kami</a>
                            </li>
                            <li style={{marginBottom: '0.8rem'}}>
                                <a href="#events" className="footer-link">Agenda Kegiatan</a>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 style={{fontSize: '1.1rem', marginBottom: '1.5rem', borderBottom: '2px solid #d4a373', display: 'inline-block', paddingBottom: '5px', letterSpacing: '1px'}}>Hubungi Kami</h4>
                        <ul style={{listStyle: 'none', padding: 0}}>
                            <li style={{marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <span style={{color: '#d4a373'}}>✉</span> 
                                <a href="mailto:info@saungriung.id" className="footer-link">info@saungriung.id</a>
                            </li>
                            <li style={{marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <span style={{color: '#d4a373'}}>📞</span> 
                                <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="footer-link">+62 812-3456-7890</a>
                            </li>
                            <li style={{marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '10px'}}>
                                <span style={{color: '#d4a373', marginTop: '3px'}}>📍</span> 
                                <a href="https://maps.app.goo.gl/4mR1LhRbk9KqmBuF8" target="_blank" rel="noreferrer" className="footer-link">
                                    Gg Saiyan, RT.9/RW.2, Koja, Jakarta Utara
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{fontSize: '1.1rem', marginBottom: '1.5rem', borderBottom: '2px solid #d4a373', display: 'inline-block', paddingBottom: '5px', letterSpacing: '1px'}}>Lokasi</h4>
                        <div style={{borderRadius: '16px', overflow: 'hidden', height: '150px', border: '1px solid rgba(255,255,255,0.1)'}}>
                            <iframe 
                                title="Saung Riung Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.995417132507!2d106.90907477600747!3d-6.1313167938555075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1f0066ae204d%3A0xbd45bf44f3caf07a!2sSAUNG%20RIUNG!5e0!3m2!1sen!2sid!4v1771851898168!5m2!1sen!2sid" 
                                width="100%" 
                                height="100%" 
                                style={{border: 0}} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>
                
                <div style={{marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: '0.9rem', opacity: 0.6}}>
                    &copy; {new Date().getFullYear()} Saung Riung. Hak Cipta Dilindungi.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
