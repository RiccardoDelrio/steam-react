import React from 'react';
import { Link } from 'react-router-dom';
import './GameCard.css';

// Funzione per ottenere l'icona della piattaforma
const getPlatformIcon = (platformName) => {
    const name = platformName.toLowerCase();
    if (name.includes('pc')) return '🖥️';
    if (name.includes('playstation')) return '🎮';
    if (name.includes('xbox')) return '🎮';
    if (name.includes('nintendo')) return '🎮';
    if (name.includes('ios')) return '📱';
    if (name.includes('android')) return '📱';
    return '🎮';
};

export default function GameCard({ game, variant = 'grid' }) {
    const baseImageUrl = 'http://127.0.0.1:8000/storage/';

    return (
        <Link to={`/game/${game.id}`} className={`game-card ${variant} ${variant === 'list' ? 'd-flex flex-column flex-md-row' : ''}`}>
            <div className={`game-card_image ${variant === 'list' ? 'flex-shrink-0' : ''}`}>
                <img
                    src={`${baseImageUrl}${game.image}`}
                    alt={game.title}
                    className="w-100 h-100"

                />
                {game.is_beta === 1 && <span className="game-card_beta-badge">BETA</span>}
                {parseFloat(game.price) === 0 && <span className="game-card_free-badge">FREE</span>}

                {/* Overlay con informazioni rapide */}
                <div className="game-card_overlay">
                    <div className="game-card_quick-info d-flex gap-2">
                        <span className="game-card_year-badge">{game.release_year}</span>
                        <span className="game-card_price-badge">
                            {parseFloat(game.price) === 0 ? 'FREE' : `€${game.price}`}
                        </span>
                    </div>
                </div>
            </div>

            <div className={`game-card_content ${variant === 'list' ? 'flex-fill d-flex flex-column' : ''}`}>
                <h3 className="game-card_title">{game.title}</h3>
                <p className="game-card_developer">{game.developer}</p>
                <p className="game-card_description">
                    {game.description.length > 100
                        ? `${game.description.substring(0, 100)}...`
                        : game.description
                    }
                </p>

                <div className="game-card_genres d-flex flex-wrap gap-2 mb-3">
                    {game.genres.slice(0, 3).map(genre => (
                        <span key={genre.id} className="game-card_genre-tag">
                            {genre.name}
                        </span>
                    ))}
                </div>

                <div className="game-card_platforms d-flex flex-wrap gap-2 mb-3">
                    {game.platforms.slice(0, 4).map(platform => (
                        <span
                            key={platform.id}
                            className="game-card_platform-icon"
                            title={platform.name}
                        >
                            {platform.name}
                        </span>
                    ))}
                </div>

                <div className={`game-card_footer d-flex justify-content-between align-items-center ${variant === 'list' ? 'mt-auto' : ''}`}>
                    <span className="game-card_year">{game.release_year}</span>
                    <span className="game-card_price">
                        {parseFloat(game.price) === 0 ? 'FREE' : `€${game.price}`}
                    </span>
                </div>
            </div>
        </Link>
    );
}
