import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseServices';

const fetchFavorites = async (userId) => {
    try {
        const docRef = doc(db, 'favorites', userId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return [];

        return docSnap.data().items;
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return [];
    }
};

const updateFavorites = async (userId, favorites) => {
    try {
        const docRef = doc(db, 'favorites', userId);
        await setDoc(docRef, { items: favorites }, { merge: true });
    } catch (error) {
        console.error('Error updating favorites:', error);
    }
};

const toggleFavoriteItem = async (userId, item) => {
    try {
        const favorites = await fetchFavorites(userId);
        const itemIndex = favorites.findIndex(favItem => favItem.id === item.id);
        let isFavorite = false;

        if (itemIndex === -1) {
            favorites.push(item);
            isFavorite = true;
        } else {
            favorites.splice(itemIndex, 1);
        }

        await updateFavorites(userId, favorites);

        return isFavorite;
    } catch (error) {
        console.error('Error toggling favorite item:', error);
        return false;
    }
};

const checkIfFavorite = async (userId, itemId) => {
    try {
        const favorites = await fetchFavorites(userId);
        return favorites.some(favItem => favItem.id === itemId);
    } catch (error) {
        console.error('Error checking if item is favorite:', error);
        return false;
    }
};

export { fetchFavorites, toggleFavoriteItem, checkIfFavorite };