import { useContext } from 'react';
import { WishlistContext } from '../contexts/WishlistContext';

function useWishlist() {
    const context = useContext(WishlistContext);

    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }

    return context;
}

export default useWishlist;