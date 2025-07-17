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
                    <div className="game-detail_loading">
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
                    <div className="game-detail_not-found">
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
                <section className="game-detail_hero">
                    <div className="game-detail_hero-content row g-4">
                        <div className="col-lg-5">
                            <div className="game-detail_image">
                                <img
                                    src={`${baseImageUrl}${game.image}`}
                                    alt={game.title}
                                    className="w-100"
                                    onError={(e) => {
                                        e.target.src = '/placeholder-game.jpg';
                                    }}
                                />
                                {game.is_beta === 1 && <span className="game-detail_beta-badge">BETA</span>}
                                {parseFloat(game.price) === 0 && <span className="game-detail_free-badge">FREE</span>}
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="game-detail_info">
                                <h1 className="game-detail_title">{game.title}</h1>
                                <p className="game-detail_developer">Sviluppato da: <strong>{game.developer}</strong></p>
                                <p className="game-detail_year">Anno di rilascio: <strong>{game.release_year}</strong></p>

                                <div className="game-detail_price-section">
                                    <span className="game-detail_price">
                                        {parseFloat(game.price) === 0 ? 'GRATUITO' : `€${game.price}`}
                                    </span>
                                </div>

                                <div className="game-detail_genres">
                                    <h3>Generi:</h3>
                                    <div className="game-detail_genre-list d-flex flex-wrap gap-2">
                                        {game.genres.map(genre => (
                                            <span key={genre.id} className="game-detail_genre-tag">
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="game-detail_platforms">
                                    <h3>Piattaforme disponibili:</h3>
                                    <div className="game-detail_platform-list d-flex flex-wrap gap-2">
                                        {game.platforms.map(platform => (
                                            <span key={platform.id} className="game-detail_platform-tag">
                                                {platform.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Description Section */}
                <section className="game-detail_description">
                    <h2>Descrizione</h2>
                    <p>{game.description}</p>
                </section>

                {/* Related Games */}
                {relatedGames.length > 0 && (
                    <section className="game-detail_related">
                        <h2 className="text-center">Giochi correlati</h2>
                        <div className="game-detail_related-grid row g-4">
                            {relatedGames.map(relatedGame => (
                                <div key={relatedGame.id} className="col-lg-4 col-md-6">
                                    <GameCard
                                        game={relatedGame}
                                        variant="grid"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
