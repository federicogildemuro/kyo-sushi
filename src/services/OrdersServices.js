import { db } from './FirebaseServices';
import { addDoc, collection } from 'firebase/firestore';

const createOrder = async (order) => {
    try {
        const docRef = await addDoc(collection(db, 'orders'), order);
        return docRef.id;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export { createOrder };