import { db } from './FirebaseServices';
import { getDocs, collection, doc, getDoc, query, where, updateDoc } from 'firebase/firestore';
import { createProductAdapterFromFirebase } from '../adapters/ProductAdapter';

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
        throw new Error(error.message || error);
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
        throw new Error(error.message || error);
    }
}

const checkStockAndUpdate = async (cart) => {
    try {
        /* Check stock */
        const productsWithNoStock = [];
        for (const item of cart) {
            const docRef = doc(db, 'products', item.id);
            const docSnap = await getDoc(docRef);
            const product = docSnap.data();

            if (!product) {
                throw new Error(`Producto ID ${item.id} no encontrado.`);
            }

            if (product.stock < item.quantity) {
                productsWithNoStock.push(item);
            }
        }
        /* If there are products with no stock, return them */
        if (productsWithNoStock.length > 0) {
            return { success: false, productsWithNoStock: productsWithNoStock };
        }

        /* Update stock */
        for (const item of cart) {
            const docRef = doc(db, 'products', item.id);
            const docSnap = await getDoc(docRef);
            const product = docSnap.data();
            const newStock = product.stock - item.quantity;
            await updateDoc(docRef, { stock: newStock });
        }
        return { success: true, productsWithNoStock: [] };
    } catch (error) {
        throw new Error(error.message || error);
    }
};

export { fetchProducts, fetchProductById, checkStockAndUpdate };