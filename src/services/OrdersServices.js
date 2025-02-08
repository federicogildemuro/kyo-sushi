import { addDoc, collection, getDoc } from 'firebase/firestore';
import { db } from './firebaseServices';

const createOrder = async (order) => {
    try {
        const docRef = await addDoc(collection(db, 'orders'), order);
        const docSnapshot = await getDoc(docRef);
        return { id: docRef.id, ...docSnapshot.data() };
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al crear la orden');
    }
};

export { createOrder };