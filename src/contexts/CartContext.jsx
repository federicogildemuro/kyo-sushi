import { createContext, useEffect, useState, useCallback } from 'react'
import { getCart, addItemToCart, removeItemFromCart, clearCartItems } from '../services/CartsServices'

const CartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const loadCartFromStorage = useCallback(() => {
        try {
            const cart = getCart();
            setCart(cart || []);
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    }, []);

    useEffect(() => {
        loadCartFromStorage();
    }, [loadCartFromStorage]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    const isInCart = useCallback(
        (id) => cart.some((item) => item.id === id),
        [cart]
    );

    const addCartItem = useCallback(
        (item) => {
            try {
                const newCart = addItemToCart(item);
                setCart(newCart);
            } catch (error) {
                console.error('Error adding item to cart:', error);
            }
        },
        []
    );

    const removeCartItem = useCallback(
        (id) => {
            try {
                const newCart = removeItemFromCart(id);
                setCart(newCart);
            } catch (error) {
                console.error('Error removing item from cart:', error);
            }
        },
        []
    );

    const getTotalPrice = useCallback(
        () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
        [cart]
    );

    const clearCart = useCallback(() => {
        try {
            const newCart = clearCartItems();
            setCart(newCart);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    }, []);

    const obj = {
        cart,
        cartQuantity,
        isInCart,
        addCartItem,
        removeCartItem,
        getTotalPrice,
        clearCart,
    }

    return (
        <CartContext.Provider value={obj}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext }