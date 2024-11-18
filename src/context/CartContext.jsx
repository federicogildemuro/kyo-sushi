import { createContext, useEffect, useState } from 'react'
import { getCart, addToCart, updateQuantity, removeFromCart, clearCart } from '../services/CartsServices'

const CartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        try {
            const cart = await getCart();
            setCart(cart);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [cart]);

    const addItem = async (item) => {
        try {
            const newCart = await addToCart(item);
            setCart(newCart);
        } catch (error) {
            console.error(error);
        }
    };

    const updateItem = async (id, quantity) => {
        try {
            const newCart = await updateQuantity(id, quantity);
            setCart(newCart);
        } catch (error) {
            console.error(error);
        }
    };

    const removeItem = async (id) => {
        try {
            const newCart = await removeFromCart(id);
            setCart(newCart);
        } catch (error) {
            console.error(error);
        }
    };

    const emptyCart = async () => {
        try {
            const newCart = await clearCart();
            setCart(newCart);
        } catch (error) {
            console.error(error);
        }
    };

    const obj = {
        cart,
        addItem,
        updateItem,
        removeItem,
        emptyCart
    };

    return (
        <CartContext.Provider value={obj}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext }