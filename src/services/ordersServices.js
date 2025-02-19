import { getDocs, collection, query, where, doc, runTransaction, addDoc, getDoc } from 'firebase/firestore';
import { db } from './firebaseServices';
import { parseOrderFromFirebase, createOrderAdapter } from '../adapters/orderAdapters';

const fetchOrders = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'orders'));
        const orders = querySnapshot.docs.map(doc => parseOrderFromFirebase(doc));
        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw new Error(error.message || 'Error al obtener los pedidos');
    }
};

const fetchOrdersByUser = async (userId) => {
    try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const orders = querySnapshot.docs.map(doc => parseOrderFromFirebase(doc));
        return orders;
    } catch (error) {
        console.error('Error fetching orders by user:', error);
        throw new Error(error.message || 'Error al obtener los pedidos del usuario');
    }
};

const getNextorderId = async () => {
    const counterRef = doc(db, 'counters', 'orders');

    return await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        let orderId = 1;

        if (counterDoc.exists()) {
            orderId = counterDoc.data().lastorderId + 1;
        }

        transaction.update(counterRef, { lastorderId: orderId });
        return orderId;
    });
};

const createOrder = async (order) => {
    const { user, cart, total } = order;
    try {
        const orderId = await getNextorderId();
        const adaptedOrder = createOrderAdapter(orderId, user, cart, total);
        const docRef = await addDoc(collection(db, 'orders'), adaptedOrder);
        const docSnapshot = await getDoc(docRef);
        return { id: docRef.id, ...docSnapshot.data() };
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error(error.message || 'Error al crear la orden');
    }
};

export { fetchOrders, fetchOrdersByUser, createOrder };