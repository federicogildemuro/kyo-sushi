import { db } from './FirebaseServices';
import { getDocs, collection, doc, getDoc, query, where } from 'firebase/firestore';

const fetchProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

const fetchProductById = async (id) => {
    try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error(`Product with id "${id}" not found.`);
        }

        return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
        console.error(`Error fetching product by id "${id}":`, error);
        throw error;
    }
};

const fetchProductsByCategory = async (category) => {
    try {
        const q = query(collection(db, 'products'), where('category', '==', category));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error(`Error fetching products by category "${category}":`, error);
        throw error;
    }
};

export { fetchProducts, fetchProductById, fetchProductsByCategory };