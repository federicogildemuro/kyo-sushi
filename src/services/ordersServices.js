import { addDoc, collection, getDoc } from 'firebase/firestore';
import { db } from './firebaseServices';
import { createOrderAdapter } from '../adapters/orderAdapters';

const createOrder = async (order) => {
    const { user, cart, total } = order;
    try {
        const adaptedOrder = createOrderAdapter(user, cart, total);
        const docRef = await addDoc(collection(db, 'orders'), adaptedOrder);
        const docSnapshot = await getDoc(docRef);
        return { id: docRef.id, ...docSnapshot.data() };
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al crear la orden');
    }
};

export { createOrder };