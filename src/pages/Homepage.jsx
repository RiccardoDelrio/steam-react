import React from 'react';
import { useState } from 'react';
import { useGlobal } from '../Context/GlobalContext';
import GameCard from '../components/GameCard';
import './Homepage.css';

export default function Homepage() {
    const { games } = useGlobal();
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [sortBy, setSortBy] = useState('title'); // 'title', 'price', 'year'
    const [filterGenre, setFilterGenre] = useState('all');
    
    // Estrai tutti i generi unici
    const allGenres = React.useMemo(() => {
        if (!games || games.length === 0) return [];
        const genresSet = new Set();
        games.forEach(game => {
            game.genres.forEach(genre => genresSet.add(genre.name));
        });
        return Array.from(genresSet).sort();
    }, [games]);
    
    // Filtra e ordina i giochi
    const filteredAndSortedGames = React.useMemo(() => {
        if (!games || games.length === 0) return [];
        
        let filtered = games;
        
        // Filtro per genere
        if (filterGenre !== 'all') {
            filtered = games.filter(game => 
                game.genres.some(genre => genre.name === filterGenre)
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
    }, [games, filterGenre, sortBy]);
    
    if (!games || games.length === 0) {
        return (
            <div className="homepage">
                <div className="container">
                    <div className="homepage__loading">
                        <h2>Caricamento giochi...</h2>
                        <div className="loading-spinner"></div>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="homepage">
            <div className="container">
                {/* Hero Section */}
                <section className="homepage__hero">
                    <h1 className="homepage__title">Scopri il mondo dei videogiochi</h1>
                    <p className="homepage__subtitle">
                        Esplora il nostro catalogo con i migliori giochi disponibili
                    </p>
                </section>
                
                {/* Filtri e controlli */}
                <section className="homepage__controls">
                    <div className="homepage__filters">
                        <select 
                            value={filterGenre} 
                            onChange={(e) => setFilterGenre(e.target.value)}
                            className="homepage__filter-select"
                        >
                            <option value="all">Tutti i generi</option>
                            {allGenres.map(genre => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>
                        
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="homepage__sort-select"
                        >
                            <option value="title">Ordina per titolo</option>
                            <option value="price">Ordina per prezzo</option>
                            <option value="year">Ordina per anno</option>
                        </select>
                    </div>
                    
                    <div className="homepage__view-toggle">
                        <button 
                            className={`homepage__view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            🔲 Griglia
                        </button>
                        <button 
                            className={`homepage__view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            📋 Lista
                        </button>
                    </div>
                </section>
                
                {/* Contatore risultati */}
                <div className="homepage__results-count">
                    {filteredAndSortedGames.length} giochi trovati
                    {filterGenre !== 'all' && (
                        <span className="homepage__filter-info">
                            {' '}• Filtro: <strong>{filterGenre}</strong>
                        </span>
                    )}
                </div>
                
                {/* Griglia/Lista giochi */}
                <section className={`homepage__games homepage__games--${viewMode}`}>
                    {filteredAndSortedGames.map(game => (
                        <GameCard 
                            key={game.id} 
                            game={game} 
                            variant={viewMode}
                        />
                    ))}
                </section>
                
                {/* Messaggio se nessun risultato */}
                {filteredAndSortedGames.length === 0 && (
                    <div className="homepage__no-results">
                        <h3>🎮 Nessun gioco trovato</h3>
                        <p>Prova a cambiare i filtri di ricerca per trovare quello che stai cercando.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

