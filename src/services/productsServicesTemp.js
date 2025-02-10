import { query, collection, where, getDocs, doc, getDoc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseServices';
import { parseProductFromFirebase, createProductAdapter } from '../adapters/productAdapters';

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
        console.error('Error fetching products:', error);
        throw new Error(error.message || 'Error al obtener los productos');
    }
};

const fetchCategories = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const categories = new Set(querySnapshot.docs.map(doc => doc.data().category));
        return Array.from(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error(error.message || 'Error al obtener las categorías');
    }
};

const fetchProductById = async (id) => {
    try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return null;

        const product = parseProductFromFirebase(docSnap);
        return product;
    } catch (error) {
        console.error('Error fetching product by id:', error);
        throw new Error(error.message || 'Error al obtener el producto');
    }
};

const checkProductStockAndUpdate = async (cart) => {
    try {
        const outOfStockProducts = [];

        for (const item of cart) {
            const docRef = doc(db, 'products', item.id);
            const docSnap = await getDoc(docRef);
            const product = docSnap.data();

            if (!product) throw new Error(`Producto ID ${item.id} no encontrado.`);

            if (product.stock < item.quantity) outOfStockProducts.push(item);
        }

        if (outOfStockProducts.length > 0) return { success: false, outOfStockProducts: outOfStockProducts };

        for (const item of cart) {
            const docRef = doc(db, 'products', item.id);
            const docSnap = await getDoc(docRef);
            const product = docSnap.data();
            const newStock = product.stock - item.quantity;
            await updateDoc(docRef, { stock: newStock });
        }

        return { success: true, outOfStockProducts: [] };
    } catch (error) {
        console.error('Error checking product stock and updating:', error);
        throw new Error(error.message || 'Error al verificar el stock de los productos y actualizarlo');
    }
};

const createProduct = async (product) => {
    try {
        const adaptedProduct = createProductAdapter(product);
        const docRef = await addDoc(collection(db, 'products'), adaptedProduct);
        const docSnapshot = await getDoc(docRef);
        return { id: docRef.id, ...docSnapshot.data() };
    } catch (error) {
        console.error('Error creating product:', error);
        throw new Error(error.message || 'Error al crear el producto');
    }
};

const updateProduct = async (id, product) => {
    try {
        const docRef = doc(db, 'products', id);
        await updateDoc(docRef, product);
        return true;
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error(error.message || 'Error al actualizar el producto');
    }
};

const deleteProduct = async (id) => {
    try {
        const docRef = doc(db, 'products', id);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error(error.message || 'Error al eliminar el producto');
    }
}

export {
    fetchProducts,
    fetchCategories,
    fetchProductById,
    checkProductStockAndUpdate,
    createProduct,
    updateProduct,
    deleteProduct
};