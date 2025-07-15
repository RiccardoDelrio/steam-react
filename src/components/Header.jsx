import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <Link to="/" className="header__logo">
                        <h1>SteamCatalog</h1>
                    </Link>
                    
                    <nav className="header__nav">
                        <Link to="/" className="header__nav-link">
                            Home
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}

