import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseServices';

// Function to fetch the user's favorite items from the Firestore
const fetchFavorites = async (userId) => {
    try {
        // Create a reference to the 'favorites' collection and the specific user's favorites document
        const docRef = doc(db, 'favorites', userId);
        // Get the document snapshot for the user's favorites
        const docSnap = await getDoc(docRef);
        // If the document exists, return the items array; otherwise, return an empty array
        return docSnap.exists() ? docSnap.data().items : [];
    } catch (error) {
        console.error('Error fetching favorites:', error);
        // Return an empty array if there was an error
        return [];
    }
};

// Function to update the user's favorite items in the Firestore
const updateFavorites = async (userId, favorites) => {
    try {
        // Create a reference to the 'favorites' collection and the specific user's favorites document
        const docRef = doc(db, 'favorites', userId);
        // Update the user's favorites in Firestore, merging the favorites data with the existing document
        await setDoc(docRef, { items: favorites }, { merge: true });
        // Return true if the update was successful
        return true;
    } catch (error) {
        console.error('Error updating favorites:', error);
        // Return false if there was an error
        return false;
    }
};

// Export the functions to use in other parts of the application
export { fetchFavorites, updateFavorites };