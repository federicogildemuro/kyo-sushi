import { createContext, useCallback, useEffect, useState } from 'react';
import { fetchFavorites, updateFavorites } from '../services/favoritesServices';
import useAuth from '../hooks/useAuth';

// Create context to manage the favorites state throughout the app
const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
    // Get the current user from the Auth context
    const { user } = useAuth();
    const userId = user?.uid;

    // State variables to store the favorites data and loading state
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to load favorites data from Firebase for the current user
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

    // Load the favorites data when the component mounts or user changes
    useEffect(() => {
        loadFavoritesFromFirebase();
    }, [loadFavoritesFromFirebase]);

    // Function to toggle the favorite status of an item
    const toggleFavorite = useCallback(async (item) => {
        if (!userId) return false;

        setFavorites((prevFavorites) => {
            const newFavorites = [...prevFavorites];
            const itemIndex = newFavorites.findIndex(favItem => favItem.id === item.id);
            // If item doesn't exist, add it to the favorites, otherwise remove it
            if (itemIndex === -1) {
                newFavorites.push(item);
            } else {
                newFavorites.splice(itemIndex, 1);
            }
            // Update the favorites in Firebase
            updateFavorites(userId, newFavorites);
            return newFavorites;
        });

        return true;
    }, [userId]);

    // Function to check if an item is in the favorites list
    const isItemFavorite = useCallback((itemId) => {
        return favorites.some(favItem => favItem.id === itemId);
    }, [favorites]);

    // Context value to be provided to children
    const value = {
        favorites,
        loading,
        toggleFavorite,
        isItemFavorite,
    };

    return (
        // Provide context to the app components
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export { FavoritesContext, FavoritesProvider };