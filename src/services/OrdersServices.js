import { db } from './FirebaseServices'
import { addDoc, collection, getDoc } from 'firebase/firestore'

const createOrder = async (order) => {
    try {
        const docRef = await addDoc(collection(db, 'orders'), order);
        const docSnapshot = await getDoc(docRef);
        return { id: docRef.id, ...docSnapshot.data() };
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export { createOrder }