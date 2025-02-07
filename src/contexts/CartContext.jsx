import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { fetchCart, updateCart } from '../services/cartServices';
import useAuth from '../hooks/useAuth';

const CartContext = createContext();

function CartProvider({ children }) {
    const { user } = useAuth();
    const userId = user?.uid;
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadCartFromFirebase = useCallback(async () => {
        if (!userId) return;

        try {
            const cartData = await fetchCart(userId);
            setCart(cartData);
        } catch (error) {
            console.error('Error loading cart from Firebase:', error);
            setCart([]);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        loadCartFromFirebase();
    }, [loadCartFromFirebase]);

    const addCartItem = useCallback(async (item) => {
        if (!userId) return false;

        setCart((prevCart) => {
            const newCart = [...prevCart];
            const itemIndex = newCart.findIndex(cartItem => cartItem.id === item.id);
            if (itemIndex === -1) {
                newCart.push(item);
            } else {
                newCart[itemIndex].quantity = item.quantity;
            }
            updateCart(userId, newCart);
            return newCart;
        });

        return true;
    }, [userId]);

    const removeCartItem = useCallback(async (itemId) => {
        if (!userId) return false;

        setCart((prevCart) => {
            const updatedCart = prevCart.filter(item => item.id !== itemId);
            updateCart(userId, updatedCart);
            return updatedCart;
        });

        return true;
    }, [userId]);

    const clearCartItems = useCallback(async () => {
        if (!userId) return false;

        setCart([]);
        return updateCart(userId, [])
    }, [userId]);

    const isItemInCart = useCallback((itemId) => {
        return cart.some(cartItem => cartItem.id === itemId);
    }, [cart]);

    const cartItemQuantity = useCallback((itemId) => {
        const item = cart.find((item) => item.id === itemId);
        return item ? item.quantity : 0;
    }, [cart]);

    const cartTotalQuantity = useMemo(() => (
        user ? cart?.reduce((quantity, item) => quantity + item.quantity, 0) : 0
    ), [user, cart]);

    const cartTotalAmount = useMemo(() => (
        cart?.reduce((total, item) => total + (item.price * item.quantity), 0)
    ), [cart]);

    const value = {
        cart,
        loading,
        addCartItem,
        removeCartItem,
        clearCartItems,
        isItemInCart,
        cartItemQuantity,
        cartTotalQuantity,
        cartTotalAmount,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartProvider };