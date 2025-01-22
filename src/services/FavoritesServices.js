import { db } from './FirebaseServices';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const fetchUserFavorites = async (userId) => {
    try {
        const docRef = doc(db, 'favorites', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().items || [];
        }

        return [];
    } catch (error) {
        console.error('Error fetching user favorites:', error.message);
        return [];
    }
};

const updateUserFavorites = async (userId, favorites) => {
    try {
        const docRef = doc(db, 'favorites', userId);
        await setDoc(docRef, { items: favorites }, { merge: true });
    } catch (error) {
        console.error('Error updating user favorites:', error.message);
    }
};

const toggleFavoriteItem = async (userId, item) => {
    try {
        const favorites = await fetchUserFavorites(userId);
        const itemIndex = favorites.findIndex(favItem => favItem.id === item.id);
        let isFavorite = false;

        if (itemIndex === -1) {
            favorites.push(item);
            isFavorite = true;
        } else {
            favorites.splice(itemIndex, 1);
        }

        await updateUserFavorites(userId, favorites);
        return isFavorite;
    } catch (error) {
        console.error('Error toggling favorite item:', error.message);
        return false;
    }
};

const checkIfFavorite = async (userId, itemId) => {
    try {
        const favorites = await fetchUserFavorites(userId);
        return favorites.some(favItem => favItem.id === itemId);
    } catch (error) {
        console.error('Error checking if item is favorite:', error.message);
        return false;
    }
};

export { fetchUserFavorites, toggleFavoriteItem, checkIfFavorite };