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
        <Link to={`/game/${game.id}`} className={`game-card ${variant}`}>
            <div className="game-card__image">
                <img 
                    src={`${baseImageUrl}${game.image}`} 
                    alt={game.title}
                    onError={(e) => {
                        e.target.src = '/placeholder-game.jpg'; // fallback image
                    }}
                />
                {game.is_beta === 1 && <span className="game-card__beta-badge">BETA</span>}
                {parseFloat(game.price) === 0 && <span className="game-card__free-badge">FREE</span>}
                
                {/* Overlay con informazioni rapide */}
                <div className="game-card__overlay">
                    <div className="game-card__quick-info">
                        <span className="game-card__year-badge">{game.release_year}</span>
                        <span className="game-card__price-badge">
                            {parseFloat(game.price) === 0 ? 'FREE' : `€${game.price}`}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="game-card__content">
                <h3 className="game-card__title">{game.title}</h3>
                <p className="game-card__developer">{game.developer}</p>
                <p className="game-card__description">
                    {game.description.length > 100 
                        ? `${game.description.substring(0, 100)}...` 
                        : game.description
                    }
                </p>
                
                <div className="game-card__genres">
                    {game.genres.slice(0, 3).map(genre => (
                        <span key={genre.id} className="game-card__genre-tag">
                            {genre.name}
                        </span>
                    ))}
                </div>
                
                <div className="game-card__platforms">
                    {game.platforms.slice(0, 4).map(platform => (
                        <span 
                            key={platform.id} 
                            className="game-card__platform-icon" 
                            title={platform.name}
                        >
                            {getPlatformIcon(platform.name)}
                            <span className="game-card__platform-text">
                                {platform.name.length > 8 ? platform.name.substring(0, 8) + '...' : platform.name}
                            </span>
                        </span>
                    ))}
                </div>
                
                <div className="game-card__footer">
                    <span className="game-card__year">{game.release_year}</span>
                    <span className="game-card__price">
                        {parseFloat(game.price) === 0 ? 'FREE' : `€${game.price}`}
                    </span>
                </div>
            </div>
        </Link>
    );
}
