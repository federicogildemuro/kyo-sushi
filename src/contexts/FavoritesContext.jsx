import { createContext, useCallback, useEffect, useState } from 'react';
import { fetchFavorites, updateFavorites } from '../services/favoritesServices';
import useAuth from '../hooks/useAuth';

// Create context to manage the favorites throughout the app
const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
    // Get the current user from the Auth context
    const { user } = useAuth();
    const userId = user?.uid;

    // States to store favorites data and loading state
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to load favorites data for the current user
    const loadFavoritesFromFirebase = useCallback(async () => {
        // If there's no user, don't load the favorites
        if (!userId) return;

        try {
            // Get the favorites data and set the state
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
        // If there's no user, don't toggle the favorite status
        if (!userId) return false;
        // Update the favorites state with the new item
        setFavorites((prevFavorites) => {
            const newFavorites = [...prevFavorites];
            const itemIndex = newFavorites.findIndex(favItem => favItem.id === item.id);
            // If item doesn't exist, add it to the favorites, otherwise remove it
            if (itemIndex === -1) {
                newFavorites.push(item);
            } else {
                newFavorites.splice(itemIndex, 1);
            }
            // Update the favorites and return the new favorites
            updateFavorites(userId, newFavorites);
            return newFavorites;
        });
        // Return true to indicate success
        return true;
    }, [userId]);

    // Function to check if an item is in the favorites
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