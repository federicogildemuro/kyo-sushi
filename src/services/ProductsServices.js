import { getDocs, collection, doc, getDoc, query, where, updateDoc, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from './firebaseServices';
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

const fetchCategories = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const categories = new Set(querySnapshot.docs.map(doc => doc.data().category));
        return Array.from(categories);
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

const createProduct = async (product) => {
    try {
        const docRef = await addDoc(collection(db, 'products'), product);
        return docRef.id;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

const updateProduct = async (id, product) => {
    try {
        const docRef = doc(db, 'products', id);
        await setDoc(docRef, product);
    } catch (error) {
        throw new Error(error.message || error);
    }
}

const deleteProduct = async (id) => {
    try {
        const docRef = doc(db, 'products', id);
        await deleteDoc(docRef);
    } catch (error) {
        throw new Error(error.message || error);
    }
}

const checkProductStockAndUpdate = async (cart) => {
    try {
        const productsWithNoStock = [];

        for (const item of cart) {
            const docRef = doc(db, 'products', item.id);
            const docSnap = await getDoc(docRef);
            const product = docSnap.data();

            if (!product) throw new Error(`Producto ID ${item.id} no encontrado.`);

            if (product.stock < item.quantity) productsWithNoStock.push(item);
        }

        if (productsWithNoStock.length > 0) return { success: false, productsWithNoStock: productsWithNoStock };

        for (const item of cart) {
            const docRef = doc(db, 'products', item.id);
            const docSnap = await getDoc(docRef);
            const product = docSnap.data();
            const newStock = product.stock - item.quantity;
            await updateDoc(docRef, { stock: newStock });
        }

        return { success: true, productsWithNoStock: [] };
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al actualizar el stock de los productos');
    }
}

export { fetchProducts, fetchCategories, fetchProductById, createProduct, updateProduct, deleteProduct, checkProductStockAndUpdate };