import { addDoc, collection, getDoc } from 'firebase/firestore';
import { db } from './firebaseServices';
import { createOrderAdapter } from '../adapters/orderAdapters';

const createOrder = async (order) => {
    try {
        const adaptedOrder = createOrderAdapter(order);
        const docRef = await addDoc(collection(db, 'orders'), adaptedOrder);
        const docSnapshot = await getDoc(docRef);
        return { id: docRef.id, ...docSnapshot.data() };
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al crear la orden');
    }
};

export { createOrder };