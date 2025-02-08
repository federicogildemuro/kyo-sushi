import { query, collection, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseServices';
import { parseProductFromFirebase } from '../adapters/productAdapters';

const fetchProducts = async (category) => {
    try {
        if (category) {
            const q = query(collection(db, 'products'), where('category', '==', category));
            const querySnapshot = await getDocs(q);
            const products = querySnapshot.docs.map(doc => parseProductFromFirebase(doc));
            return products;
        }
        const querySnapshot = await getDocs(collection(db, 'products'));
        const products = querySnapshot.docs.map(doc => parseProductFromFirebase(doc));
        return products;
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al obtener los productos');
    }
}

const fetchCategories = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const categories = new Set(querySnapshot.docs.map(doc => doc.data().category));
        return Array.from(categories);
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al obtener las categorías');
    }
}

const fetchProductById = async (id) => {
    try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return null;

        const product = parseProductFromFirebase(docSnap);
        return product;
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al obtener el producto');
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

export { fetchProducts, fetchCategories, fetchProductById, checkProductStockAndUpdate };