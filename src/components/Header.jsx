import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header_content d-flex justify-content-between align-items-center">
                    <Link to="/" className="header_logo">
                        <h1>SteamCatalog</h1>
                    </Link>

                    <nav className="header_nav d-flex gap-3">
                        <Link to="/" className="header_nav-link">
                            Home
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}

