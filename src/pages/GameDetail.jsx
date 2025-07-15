import React from 'react';
import { useParams } from 'react-router-dom';
import { useGlobal } from '../Context/GlobalContext';
import GameCard from '../components/GameCard';
import './GameDetail.css';

export default function GameDetail() {
    const { id } = useParams();
    const { games } = useGlobal();
    
    const game = games.find(g => g.id === parseInt(id));
    
    if (!games || games.length === 0) {
        return (
            <div className="game-detail">
                <div className="container">
                    <div className="game-detail__loading">
                        <h2>Caricamento...</h2>
                    </div>
                </div>
            </div>
        );
    }
    
    if (!game) {
        return (
            <div className="game-detail">
                <div className="container">
                    <div className="game-detail__not-found">
                        <h2>Gioco non trovato</h2>
                        <p>Il gioco che stai cercando non esiste nel nostro catalogo.</p>
                    </div>
                </div>
            </div>
        );
    }
    
    // Giochi correlati (stesso genere)
    const relatedGames = games
        .filter(g => g.id !== game.id && g.genres.some(genre => 
            game.genres.some(gameGenre => gameGenre.id === genre.id)
        ))
        .slice(0, 3);
    
    const baseImageUrl = 'http://127.0.0.1:8000/storage/';
    
    return (
        <div className="game-detail">
            <div className="container">
                {/* Hero Section */}
                <section className="game-detail__hero">
                    <div className="game-detail__hero-content">
                        <div className="game-detail__image">
                            <img 
                                src={`${baseImageUrl}${game.image}`} 
                                alt={game.title}
                                onError={(e) => {
                                    e.target.src = '/placeholder-game.jpg';
                                }}
                            />
                            {game.is_beta === 1 && <span className="game-detail__beta-badge">BETA</span>}
                            {parseFloat(game.price) === 0 && <span className="game-detail__free-badge">FREE</span>}
                        </div>
                        
                        <div className="game-detail__info">
                            <h1 className="game-detail__title">{game.title}</h1>
                            <p className="game-detail__developer">Sviluppato da: <strong>{game.developer}</strong></p>
                            <p className="game-detail__year">Anno di rilascio: <strong>{game.release_year}</strong></p>
                            
                            <div className="game-detail__price-section">
                                <span className="game-detail__price">
                                    {parseFloat(game.price) === 0 ? 'GRATUITO' : `€${game.price}`}
                                </span>
                            </div>
                            
                            <div className="game-detail__genres">
                                <h3>Generi:</h3>
                                <div className="game-detail__genre-list">
                                    {game.genres.map(genre => (
                                        <span key={genre.id} className="game-detail__genre-tag">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="game-detail__platforms">
                                <h3>Piattaforme disponibili:</h3>
                                <div className="game-detail__platform-list">
                                    {game.platforms.map(platform => (
                                        <span key={platform.id} className="game-detail__platform-tag">
                                            {platform.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Description Section */}
                <section className="game-detail__description">
                    <h2>Descrizione</h2>
                    <p>{game.description}</p>
                </section>
                
                {/* Related Games */}
                {relatedGames.length > 0 && (
                    <section className="game-detail__related">
                        <h2>Giochi correlati</h2>
                        <div className="game-detail__related-grid">
                            {relatedGames.map(relatedGame => (
                                <GameCard 
                                    key={relatedGame.id} 
                                    game={relatedGame} 
                                    variant="grid"
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
