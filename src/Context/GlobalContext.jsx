import { createContext, useContext, useState, useEffect } from "react";
const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/videogames/')
            .then(response => response.json())
            .then(data => {
                setGames(data);
                console.log('Games fetched:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <GlobalContext.Provider value={{ games, setGames }}>
            {children}
        </GlobalContext.Provider>
    );
}

function useGlobal() {
    return useContext(GlobalContext);
}

export { GlobalProvider, useGlobal };