import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer_content row g-4">
                    <div className="footer_section col-md-4">
                        <h3>SteamCatalog</h3>
                        <p>La tua vetrina per scoprire i migliori videogiochi disponibili.</p>
                    </div>

                    <div className="footer_section col-md-4">
                        <h4>Link utili</h4>
                        <ul className="footer_links list-unstyled">
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">Chi siamo</a></li>
                            <li><a href="/contact">Contatti</a></li>
                        </ul>
                    </div>

                    <div className="footer_section col-md-4">
                        <h4>Generi popolari</h4>
                        <ul className="footer_links list-unstyled">
                            <li><a href="/?genre=Action">Action</a></li>
                            <li><a href="/?genre=RPG">RPG</a></li>
                            <li><a href="/?genre=Adventure">Adventure</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer_bottom text-center">
                    <p>&copy; 2025 SteamCatalog. Progetto educativo realizzato con React.</p>
                </div>
            </div>
        </footer>
    );
}
