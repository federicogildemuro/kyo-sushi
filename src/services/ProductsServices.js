import { db } from './FirebaseServices'
import { getDocs, collection, doc, getDoc, query, where } from 'firebase/firestore'
import { createProductAdapterFromFirebase } from '../adapters/ProductAdapter'

const fetchProducts = async (category) => {
    try {
        if (category) {
            const q = query(collection(db, 'products'), where('category', '==', category));
            const querySnapshot = await getDocs(q);
            const products = querySnapshot.docs.map(doc => createProductAdapterFromFirebase(doc));
            return products;
        }
        const querySnapshot = await getDocs(collection(db, 'products'));
        const products = querySnapshot.docs.map(doc => createProductAdapterFromFirebase(doc));
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

const fetchProductById = async (id) => {
    try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return null;
        }

        const product = createProductAdapterFromFirebase(docSnap);
        return product;
    } catch (error) {
        console.error(`Error fetching product by id "${id}":`, error);
        throw error;
    }
}

export { fetchProducts, fetchProductById }