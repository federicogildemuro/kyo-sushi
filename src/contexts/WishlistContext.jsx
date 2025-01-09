import { createContext, useCallback, useEffect, useState } from 'react';
import { getWishlist, isItemInWishlist, addItemToWishlist, removeItemFromWishlist } from '../services/WishlistServices';

const WishlistContext = createContext();

function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);

    const loadWishlistFromStorage = useCallback(() => {
        try {
            const wishlist = getWishlist();
            setWishlist(wishlist || []);
        } catch (error) {
            console.error('Error loading wishlist:', error);
        }
    }, []);

    useEffect(() => {
        loadWishlistFromStorage();
    }, [loadWishlistFromStorage]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const isInWishlist = useCallback(
        (id) => {
            return isItemInWishlist(id);
        },
        []
    );

    const addWishlistItem = useCallback(
        (item) => {
            try {
                const newWishlist = addItemToWishlist(item);
                setWishlist(newWishlist);
            } catch (error) {
                console.error('Error adding item to wishlist:', error);
            }
        },
        []
    );

    const removeWishlistItem = useCallback(
        (id) => {
            try {
                const newWishlist = removeItemFromWishlist(id);
                setWishlist(newWishlist);
            } catch (error) {
                console.error('Error removing item from wishlist:', error);
            }
        },
        []
    );

    const obj = {
        wishlist,
        isInWishlist,
        addWishlistItem,
        removeWishlistItem
    }

    return (
        <WishlistContext.Provider value={obj}>
            {children}
        </WishlistContext.Provider>
    )
}

export { WishlistProvider, WishlistContext };