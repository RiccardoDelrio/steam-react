import React from 'react';
import { useState, useMemo } from 'react';
import { useGlobal } from '../Context/GlobalContext';
import GameCard from '../components/GameCard';
import './Homepage.css';

export default function Homepage() {
    const { games } = useGlobal();
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [sortBy, setSortBy] = useState('title');
    const [filterGenre, setFilterGenre] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');


    // Estrai tutti i generi unici
    const allGenres = useMemo(() => {
        if (!games || games.length === 0) return [];
        const genresSet = new Set();
        games.forEach(game => {
            game.genres.forEach(genre => genresSet.add(genre.name));
        });
        return Array.from(genresSet).sort();
    }, [games]);

    // Filtra e ordina i giochi
    const filteredAndSortedGames = useMemo(() => {
        if (!games || games.length === 0) return [];

        let filtered = games;

        // Filtro per genere
        if (filterGenre !== 'all') {
            filtered = filtered.filter(game =>
                game.genres.some(genre => genre.name === filterGenre)
            );
        }

        // Filtro per ricerca testuale
        if (searchTerm.trim()) {
            filtered = filtered.filter(game =>
                game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Ordinamento
        const sorted = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'price':
                    return parseFloat(a.price) - parseFloat(b.price);
                case 'year':
                    return parseInt(b.release_year) - parseInt(a.release_year);
                case 'title':
                default:
                    return a.title.localeCompare(b.title);
            }
        });

        return sorted;
    }, [games, filterGenre, sortBy, searchTerm]);

    if (!games || games.length === 0) {
        return (
            <div className="homepage">
                <div className="container">
                    <div className="homepage_loading">
                        <h2>Caricamento giochi...</h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="homepage">
            <div className="container">
                {/* Hero Section */}
                <section className="homepage_hero">
                    <h1 className="homepage_title">Scopri il mondo dei videogiochi</h1>
                    <p className="homepage_subtitle">
                        Esplora il nostro catalogo con i migliori giochi disponibili
                    </p>
                </section>

                {/* Filtri e controlli */}
                <section className="homepage_controls">
                    <div className="homepage_filters d-flex flex-column flex-md-row gap-3">
                        <select
                            value={filterGenre}
                            onChange={(e) => setFilterGenre(e.target.value)}
                            className="homepage_filter-select"
                        >
                            <option value="all">Tutti i generi</option>
                            {allGenres.map(genre => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="homepage_sort-select"
                        >
                            <option value="title">Ordina per titolo</option>
                            <option value="price">Ordina per prezzo</option>
                            <option value="year">Ordina per anno</option>
                        </select>
                    </div>

                    <div className="homepage_view-toggle">
                        <button
                            className={`homepage_view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            🔲 Griglia
                        </button>
                        <button
                            className={`homepage_view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            📋 Lista
                        </button>
                    </div>
                </section>

                {/* Contatore risultati e Searchbar */}
                <div className="homepage_results-search d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4">
                    <div className="homepage_results-count">
                        {filteredAndSortedGames.length} giochi trovati
                        {filterGenre !== 'all' && (
                            <span className="homepage_filter-info">
                                {' '}• Filtro: <strong>{filterGenre}</strong>
                            </span>
                        )}
                        {searchTerm && (
                            <span className="homepage_search-info">
                                {' '}• Ricerca: <strong>"{searchTerm}"</strong>
                            </span>
                        )}
                    </div>

                    <div className="homepage_search-container">
                        <div className="input-group">
                            <span className="input-group-text">🔍</span>
                            <input
                                type="text"
                                className="form-control homepage_search-input"
                                placeholder="Cerca giochi, sviluppatori..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => setSearchTerm('')}
                                    title="Cancella ricerca"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Griglia/Lista giochi */}
                <section className={`homepage_games ${viewMode === 'grid' ? 'row g-4' : 'd-flex flex-column gap-3'}`}>
                    {filteredAndSortedGames.map(game => (
                        viewMode === 'grid' ? (
                            <div key={game.id} className="col-xl-4 col-lg-6 col-md-6">
                                <GameCard game={game} variant={viewMode} />
                            </div>
                        ) : (
                            <GameCard key={game.id} game={game} variant={viewMode} />
                        )
                    ))}
                </section>

                {/* Messaggio se nessun risultato */}
                {filteredAndSortedGames.length === 0 && (
                    <div className="homepage_no-results text-center py-5">
                        <h3>🎮 Nessun gioco trovato</h3>
                        <p>
                            {searchTerm ?
                                `Nessun risultato per "${searchTerm}". Prova con altri termini di ricerca.` :
                                'Prova a cambiare i filtri di ricerca per trovare quello che stai cercando.'
                            }
                        </p>
                        {(searchTerm || filterGenre !== 'all') && (
                            <button
                                className="btn btn-primary mt-2"
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilterGenre('all');
                                }}
                            >
                                Rimuovi tutti i filtri
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

