import { createContext, useCallback, useEffect, useState } from 'react';
import { fetchFavorites, updateFavorites } from '../services/favoritesServices';
import useAuth from '../hooks/useAuth';

const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
    const { user } = useAuth();
    const userId = user?.uid;
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadFavoritesFromFirebase = useCallback(async () => {
        if (!userId) return;

        try {
            const favoritesData = await fetchFavorites(userId);
            setFavorites(favoritesData);
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

    const toggleFavorite = useCallback(async (item) => {
        if (!userId) return false;

        setFavorites((prevFavorites) => {
            const newFavorites = [...prevFavorites];
            const itemIndex = newFavorites.findIndex(favItem => favItem.id === item.id);

            if (itemIndex === -1) {
                newFavorites.push(item);
            } else {
                newFavorites.splice(itemIndex, 1);
            }

            updateFavorites(userId, newFavorites);
            return newFavorites;
        });

        return true;
    }, [userId]);

    const isItemFavorite = useCallback((itemId) => {
        return favorites.some(favItem => favItem.id === itemId);
    }, [favorites]);

    const value = {
        favorites,
        loading,
        toggleFavorite,
        isItemFavorite,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export { FavoritesContext, FavoritesProvider };