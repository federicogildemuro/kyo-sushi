import { createContext, useCallback, useEffect, useState } from 'react';
import { fetchFavorites, toggleFavoriteItem, checkIfFavorite } from '../services/favoritesServices';
import useAuth from '../hooks/useAuth';

const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
    const { user } = useAuth();
    const userId = user?.uid;
    const [favorites, setFavorites] = useState(undefined);
    const [loading, setLoading] = useState(true);

    const loadFavoritesFromFirebase = useCallback(
        async () => {
            if (!userId) return;

            try {
                const favorites = await fetchFavorites(userId);
                setFavorites(favorites);
            } catch (error) {
                console.error('Error loading favorites from Firebase:', error);
                setFavorites([]);
            } finally {
                setLoading(false);
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

                setFavorites(prevFavorites =>
                    isFavorite ? [...prevFavorites, item] : prevFavorites.filter(favItem => favItem.id !== item.id)
                );

                return isFavorite;
            } catch (error) {
                console.error('Error toggling favorite item:', error);
                return false;
            }
        },
        [userId]
    );

    const checkFavorite = useCallback(
        async (id) => {
            if (!userId) return false;

            try {
                return await checkIfFavorite(userId, id);
            } catch (error) {
                console.error('Error checking if item is favorite:', error);
                return false;
            }
        },
        [userId]
    );

    const value = {
        favorites,
        loading,
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