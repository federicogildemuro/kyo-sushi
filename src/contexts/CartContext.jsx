import { createContext, useEffect, useState, useCallback } from 'react'
import { getCart, isItemInCart, addItemToCart, removeItemFromCart, calculateCartTotal, clearCartItems } from '../services/CartsServices'

const CartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    const fetchCart = useCallback(() => {
        try {
            const cart = getCart();
            setCart(cart);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const isInCart = useCallback((id) => {
        return isItemInCart(id);
    }, []);

    const addCartItem = useCallback((item) => {
        if (!item || !item.id || !item.quantity) {
            console.error('Datos inválidos para añadir al carrito');
            return;
        }
        try {
            const newCart = addItemToCart(item);
            setCart(newCart);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const removeCartItem = useCallback((id) => {
        try {
            const newCart = removeItemFromCart(id);
            setCart(newCart);
        } catch (error) {
            console.error(error);
        }
    }, []);


    const totalPrice = () => {
        return calculateCartTotal();
    };

    const clearCart = useCallback(() => {
        try {
            const newCart = clearCartItems();
            setCart(newCart);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const obj = {
        cart,
        cartQuantity,
        isInCart,
        addCartItem,
        removeCartItem,
        totalPrice,
        clearCart
    };

    return <CartContext.Provider value={obj}>{children}</CartContext.Provider>
}

export { CartProvider, CartContext }