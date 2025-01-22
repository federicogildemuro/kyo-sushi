import { db } from './FirebaseServices';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const fetchUserCart = async (userId) => {
    try {
        const docRef = doc(db, 'carts', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().items || [];
        }

        return [];
    } catch (error) {
        console.error('Error fetching user cart:', error.message);
        return [];
    }
}

const updateUserCart = async (userId, cart) => {
    try {
        const docRef = doc(db, 'carts', userId);
        await setDoc(docRef, { items: cart }, { merge: true });
    } catch (error) {
        console.error('Error updating user cart:', error.message);
    }
}

const addItemToCart = async (userId, item) => {
    try {
        const cart = await fetchUserCart(userId);
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity = item.quantity;
        } else {
            cart.push(item);
        }

        await updateUserCart(userId, cart);
        return cart;
    } catch (error) {
        console.error('Error adding item to cart:', error.message);
        return [];
    }
}

const removeItemFromCart = async (userId, itemId) => {
    try {
        const cart = await fetchUserCart(userId);
        const updatedCart = cart.filter(item => item.id !== itemId);

        await updateUserCart(userId, updatedCart);
        return updatedCart;
    } catch (error) {
        console.error('Error removing item from cart:', error.message);
        return [];
    }
}

const checkIfItemInCart = async (userId, itemId) => {
    try {
        const cart = await fetchUserCart(userId);
        return cart.some(item => item.id === itemId);
    } catch (error) {
        console.error('Error checking if item is in cart:', error.message);
        return false;
    }
}

export { fetchUserCart, updateUserCart, addItemToCart, removeItemFromCart, checkIfItemInCart };