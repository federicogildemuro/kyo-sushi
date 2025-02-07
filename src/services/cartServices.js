import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseServices';

const fetchCart = async (userId) => {
    try {
        const docRef = doc(db, 'carts', userId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data().items : [];
    } catch (error) {
        console.error('Error fetching cart:', error);
        return [];
    }
};

const updateCart = async (userId, cart) => {
    try {
        const docRef = doc(db, 'carts', userId);
        await setDoc(docRef, { items: cart }, { merge: true });
        return true;
    } catch (error) {
        console.error('Error updating cart:', error);
        return false;
    }
};

export { fetchCart, updateCart };