import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

// Custom hook to access the cart context
function useCart() {
    const context = useContext(CartContext);

    if (!context) throw new Error('useCart must be used within a CartProvider')

    return context;
}

export default useCart;