import { doc, runTransaction, addDoc, collection, getDoc } from 'firebase/firestore';
import { db } from './firebaseServices';
import { createOrderAdapter } from '../adapters/orderAdapters';

const getNextOrderNumber = async () => {
    const counterRef = doc(db, 'counters', 'orders');

    return await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        let orderNumber = 1;

        if (counterDoc.exists()) {
            orderNumber = counterDoc.data().lastOrderNumber + 1;
        }

        transaction.update(counterRef, { lastOrderNumber: orderNumber });
        return orderNumber;
    });
};

const createOrder = async (order) => {
    const { user, cart, total } = order;
    try {
        const orderNumber = await getNextOrderNumber();
        const adaptedOrder = createOrderAdapter(orderNumber, user, cart, total);
        const docRef = await addDoc(collection(db, 'orders'), adaptedOrder);
        const docSnapshot = await getDoc(docRef);
        return { id: docRef.id, ...docSnapshot.data() };
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al crear la orden');
    }
};

export { createOrder };