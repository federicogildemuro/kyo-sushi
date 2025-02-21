import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseServices';

// Function to fetch the user's cart from the Firestore
const fetchCart = async (userId) => {
    try {
        // Create a reference to the 'carts' collection and the specific user's cart document
        const docRef = doc(db, 'carts', userId);
        // Get the document snapshot for the user's cart
        const docSnap = await getDoc(docRef);
        // If the document exists, return the items array; otherwise, return an empty array
        return docSnap.exists() ? docSnap.data().items : [];
    } catch (error) {
        console.error('Error fetching cart:', error);
        // Return an empty array if there was an error
        return [];
    }
};

// Function to update the user's cart in the Firestore
const updateCart = async (userId, cart) => {
    try {
        // Create a reference to the 'carts' collection and the specific user's cart document
        const docRef = doc(db, 'carts', userId);
        // Update the user's cart in Firestore, merging the cart data with the existing document
        await setDoc(docRef, { items: cart }, { merge: true });
        // Return true if the update was successful
        return true;
    } catch (error) {
        console.error('Error updating cart:', error);
        // Return false if there was an error
        return false;
    }
};

export { fetchCart, updateCart };