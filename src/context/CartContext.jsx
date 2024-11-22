import { createContext, useEffect, useState, useCallback } from 'react';
import { getCart, addToCart, updateQuantity, removeFromCart, clearCart } from '../services/CartsServices';

const CartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCart = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const cart = await getCart();
            setCart(cart);
        } catch (error) {
            console.error(error);
            setError('Error al cargar el carrito');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const addItem = useCallback(async (item) => {
        if (!item || !item.id || !item.quantity) {
            console.error('Datos inválidos para añadir al carrito');
            return;
        }
        try {
            const newCart = await addToCart(item);
            setCart(newCart);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const updateItem = useCallback(async (id, quantity) => {
        try {
            const newCart = await updateQuantity(id, quantity);
            setCart(newCart);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const removeItem = useCallback(async (id) => {
        try {
            const newCart = await removeFromCart(id);
            setCart(newCart);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const emptyCart = useCallback(async () => {
        try {
            const newCart = await clearCart();
            setCart(newCart);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const obj = {
        cart,
        loading,
        error,
        addItem,
        updateItem,
        removeItem,
        emptyCart,
    };

    return <CartContext.Provider value={obj}>{children}</CartContext.Provider>;
}

export { CartProvider, CartContext };