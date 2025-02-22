import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { fetchCart, updateCart } from '../services/cartServices';

// Create context to manage the cart throughout the app
const CartContext = createContext();

function CartProvider({ children }) {
    // Get the current user from the Auth context
    const { user } = useAuth();
    const userId = user?.uid;

    // States to store cart data and loading state
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to load cart data for the current user
    const loadCartFromFirebase = useCallback(async () => {
        // If there's no user, don't load the cart
        if (!userId) return;
        try {
            // Get the cart data and set the state
            const cartData = await fetchCart(userId);
            setCart(cartData);
        } catch (error) {
            console.error('Error loading cart from Firebase:', error);
            setCart([]);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    // Load the cart data when the component mounts or user changes
    useEffect(() => {
        loadCartFromFirebase();
    }, [loadCartFromFirebase]);

    // Function to add an item to the cart
    const addCartItem = useCallback(async (item) => {
        // If there's no user, don't add the item to the cart
        if (!userId) return false;
        // Update the cart state with the new item
        setCart((prevCart) => {
            const newCart = [...prevCart];
            const itemIndex = newCart.findIndex(cartItem => cartItem.id === item.id);
            // If item doesn't exist, add it to the cart, otherwise update quantity
            if (itemIndex === -1) {
                newCart.push(item);
            } else {
                newCart[itemIndex].quantity = item.quantity;
            }
            // Update the cart and return the new cart
            updateCart(userId, newCart);
            return newCart;
        });
        // Return true to indicate success
        return true;
    }, [userId]);

    // Function to remove an item from the cart
    const removeCartItem = useCallback(async (itemId) => {
        // If there's no user, don't remove the item from the cart
        if (!userId) return false;
        // Update the cart state by removing the item
        setCart((prevCart) => {
            const updatedCart = prevCart.filter(item => item.id !== itemId);
            updateCart(userId, updatedCart);
            return updatedCart;
        });
        // Return true to indicate success
        return true;
    }, [userId]);

    // Function to clear all items in the cart
    const clearCartItems = useCallback(async () => {
        // If there's no user, don't clear the cart
        if (!userId) return false;
        // Set the cart state to an empty array and update the cart
        setCart([]);
        return updateCart(userId, []);
    }, [userId]);

    // Function to check if an item is in the cart
    const isItemInCart = useCallback((itemId) => {
        return cart.some(cartItem => cartItem.id === itemId);
    }, [cart]);

    // Function to get the quantity of a specific item in the cart
    const cartItemQuantity = useCallback((itemId) => {
        const item = cart.find((item) => item.id === itemId);
        return item ? item.quantity : 0;
    }, [cart]);

    // Memoized value to calculate the total number of items in the cart
    const cartTotalQuantity = useMemo(() => (
        user ? cart?.reduce((quantity, item) => quantity + item.quantity, 0) : 0
    ), [user, cart]);

    // Memoized value to calculate the total price of items in the cart
    const cartTotalAmount = useMemo(() => (
        cart?.reduce((total, item) => total + (item.price * item.quantity), 0)
    ), [cart]);

    // Context value to be provided to children
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
        // Provide context to the app components
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartProvider };