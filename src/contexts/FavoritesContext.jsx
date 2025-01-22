import { createContext, useCallback, useEffect, useState } from 'react';
import { fetchUserFavorites, toggleFavoriteItem, checkIfFavorite } from '../services/FavoritesServices';
import useAuth from '../hooks/useAuth';

const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const userId = user?.uid;

    const loadFavoritesFromFirebase = useCallback(async () => {
        if (!userId) return;

        try {
            const userFavorites = await fetchUserFavorites(userId);
            setFavorites(userFavorites);
        } catch (error) {
            console.error('Error loading favorites from Firebase:', error.message);
        }
    }, [userId]);

    useEffect(() => {
        loadFavoritesFromFirebase();
    }, [loadFavoritesFromFirebase]);

    const toggleFavorite = useCallback(
        async (item) => {
            if (!userId) return false;

            try {
                const isFavorite = await toggleFavoriteItem(userId, item);
                await loadFavoritesFromFirebase();
                return isFavorite;
            } catch (error) {
                console.error('Error toggling favorite item:', error.message);
                return false;
            }
        },
        [userId, loadFavoritesFromFirebase]
    );

    const checkFavorite = useCallback(
        async (id) => {
            if (!userId) return false;

            try {
                return await checkIfFavorite(userId, id);
            } catch (error) {
                console.error('Error checking if item is favorite:', error.message);
                return false;
            }
        },
        [userId]
    );

    const value = {
        favorites,
        checkFavorite,
        toggleFavorite,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export { FavoritesContext, FavoritesProvider };