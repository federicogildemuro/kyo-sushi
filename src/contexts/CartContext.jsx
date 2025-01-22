import { createContext, useCallback, useEffect, useState } from 'react';
import { fetchUserCart, updateUserCart, addItemToCart, removeItemFromCart, checkIfItemInCart } from '../services/CartsServices';
import useAuth from '../hooks/useAuth';

const CartContext = createContext();

function CartProvider({ children }) {
    const { user } = useAuth();
    const [cart, setCart] = useState([]);
    const userId = user?.uid;

    const loadCartFromFirebase = useCallback(async () => {
        if (!userId) return;

        try {
            const userCart = await fetchUserCart(userId);
            setCart(userCart);
        } catch (error) {
            console.error('Error loading cart from Firebase:', error.message);
        }
    }, [userId]);

    useEffect(() => {
        loadCartFromFirebase();
    }, [loadCartFromFirebase]);

    const addCartItem = useCallback(
        async (item) => {
            if (!userId) return;

            try {
                const updatedCart = await addItemToCart(userId, item);
                setCart(updatedCart);
            } catch (error) {
                console.error('Error adding item to cart:', error.message);
            }
        },
        [userId]
    );

    const removeCartItem = useCallback(
        async (itemId) => {
            if (!userId) return;

            try {
                const updatedCart = await removeItemFromCart(userId, itemId);
                setCart(updatedCart);
            } catch (error) {
                console.error('Error removing item from cart:', error.message);
            }
        },
        [userId]
    );

    const clearCart = useCallback(async () => {
        if (!userId) return;

        try {
            await updateUserCart(userId, []);
            setCart([]);
        } catch (error) {
            console.error('Error clearing cart:', error.message);
        }
    }, [userId]);

    const checkItemInCart = useCallback(
        async (itemId) => {
            if (!userId) return false;

            try {
                return await checkIfItemInCart(userId, itemId);
            } catch (error) {
                console.error('Error checking if item is in cart:', error.message);
                return false;
            }
        },
        [userId]
    );

    const getTotalPrice = useCallback(
        () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
        [cart]
    );

    const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    const cartItemQuantity = (itemId) => {
        const item = cart.find((item) => item.id === itemId);
        return item ? item.quantity : 0;
    }

    const value = {
        cart,
        addCartItem,
        removeCartItem,
        clearCart,
        checkItemInCart,
        getTotalPrice,
        cartQuantity,
        cartItemQuantity
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartProvider };