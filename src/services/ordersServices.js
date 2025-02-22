import { getDocs, collection, query, where, doc, runTransaction, addDoc, getDoc } from 'firebase/firestore';
import { db } from './firebaseServices';
import { parseOrderFromFirebase, createOrderAdapter } from '../adapters/orderAdapters';

// Function to fetch all orders from Firestore
const fetchOrders = async () => {
    try {
        // Get the orders collection
        const querySnapshot = await getDocs(collection(db, 'orders'));
        // Parse orders
        const orders = querySnapshot.docs.map(doc => parseOrderFromFirebase(doc));
        // Return parsed orders
        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw new Error(error.message || 'Error al obtener los pedidos');
    }
};

// Function to fetch orders by user ID from Firestore
const fetchOrdersByUser = async (userId) => {
    try {
        // Create a reference to the 'orders' collection
        const ordersRef = collection(db, 'orders');
        // Create a query to fetch orders by user ID
        const q = query(ordersRef, where('userId', '==', userId));
        // Get the orders by user ID
        const querySnapshot = await getDocs(q);
        // Parse orders
        const orders = querySnapshot.docs.map(doc => parseOrderFromFirebase(doc));
        // Return parsed orders
        return orders;
    } catch (error) {
        console.error('Error fetching orders by user:', error);
        throw new Error(error.message || 'Error al obtener los pedidos del usuario');
    }
};

// Function to get the next order ID using a transaction in Firestore
const getNextorderId = async () => {
    // Create a reference to the 'counters' collection and the 'orders' document
    const counterRef = doc(db, 'counters', 'orders');
    // Run a transaction to get the next order ID
    return await runTransaction(db, async (transaction) => {
        // Get the last order ID from Firestore
        const counterDoc = await transaction.get(counterRef);
        // If the document exists, increment the last order ID; otherwise, use 1
        let orderId = 1;
        if (counterDoc.exists()) {
            orderId = counterDoc.data().lastorderId + 1;
        }
        // Update the last order ID
        transaction.update(counterRef, { lastorderId: orderId });
        // Return the new order ID
        return orderId;
    });
};

// Function to create a new order in Firestore
const createOrder = async (order) => {
    // Destructure order data
    const { user, cart, total } = order;
    try {
        // Get the next order ID
        const orderId = await getNextorderId();
        // Adapt order data to Firestore schema
        const adaptedOrder = createOrderAdapter(orderId, user, cart, total);
        // Add order to the collection
        const docRef = await addDoc(collection(db, 'orders'), adaptedOrder);
        // Get the order data
        const docSnapshot = await getDoc(docRef);
        // Return order data with ID
        return { id: docRef.id, ...docSnapshot.data() };
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error(error.message || 'Error al crear la orden');
    }
};

export { fetchOrders, fetchOrdersByUser, createOrder };