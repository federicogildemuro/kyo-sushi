import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseServices';

const fetchFavorites = async (userId) => {
    try {
        const docRef = doc(db, 'favorites', userId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data().items : [];
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return [];
    }
};

const updateFavorites = async (userId, favorites) => {
    try {
        const docRef = doc(db, 'favorites', userId);
        await setDoc(docRef, { items: favorites }, { merge: true });
        return true;
    } catch (error) {
        console.error('Error updating favorites:', error);
        return false;
    }
};

export { fetchFavorites, updateFavorites };