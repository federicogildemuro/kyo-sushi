import { query, collection, where, getDocs, doc, getDoc, updateDoc, runTransaction, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseServices';
import { parseProductFromFirebase, createProductAdapter } from '../adapters/productAdapters';

// Function to fetch all products from Firestore
const fetchProducts = async (category) => {
    try {
        // Fetch products by category if provided
        if (category) {
            // Create a query to fetch products by category
            const q = query(collection(db, 'products'), where('category', '==', category));
            // Get products by category
            const querySnapshot = await getDocs(q);
            // Parse products
            const products = querySnapshot.docs.map(doc => parseProductFromFirebase(doc));
            // Return parsed products
            return products;
        }
        // Get all products
        const querySnapshot = await getDocs(collection(db, 'products'));
        // Parse products
        const products = querySnapshot.docs.map(doc => parseProductFromFirebase(doc));
        // Return parsed products
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error(error.message || 'Error al obtener los productos');
    }
};

// Function to fetch all categories from Firestore
const fetchCategories = async () => {
    try {
        // Get all products
        const querySnapshot = await getDocs(collection(db, 'products'));
        // Extract categories from products as a Set to avoid duplicates
        const categories = new Set(querySnapshot.docs.map(doc => doc.data().category));
        // Return categories as an array
        return Array.from(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error(error.message || 'Error al obtener las categorías');
    }
};

// Function to fetch a product by its ID from Firestore
const fetchProductById = async (id) => {
    try {
        // Create a reference to the product document
        const docRef = doc(db, 'products', id);
        // Get the product document
        const docSnap = await getDoc(docRef);
        // Return null if the product doesn't exist
        if (!docSnap.exists()) return null;
        // Parse product
        const product = parseProductFromFirebase(docSnap);
        // Return the parsed product
        return product;
    } catch (error) {
        console.error('Error fetching product by id:', error);
        throw new Error(error.message || 'Error al obtener el producto');
    }
};

// Function to check product stock and update it in a transaction
const checkProductStockAndUpdate = async (cart) => {
    try {
        return await runTransaction(db, async (transaction) => {
            // Arrays to track out-of-stock products and product documents to update
            const outOfStockProducts = [];
            const productDocs = [];

            // Fetch all product data in a single pass
            for (const item of cart) {
                const docRef = doc(db, 'products', item.id);
                const docSnap = await transaction.get(docRef);
                const product = docSnap.data();
                // Error if product is not found
                if (!product) throw new Error(`Producto ID ${item.id} no encontrado`);
                // Add product to out-of-stock list if there is not enough stock, otherwise add it to the update list
                if (product.stock < item.quantity) {
                    outOfStockProducts.push(item);
                } else {
                    productDocs.push({ docRef, newStock: product.stock - item.quantity });
                }
            }

            // If any product is out of stock, abort the transaction and return the list of out-of-stock products
            if (outOfStockProducts.length > 0) return { success: false, outOfStockProducts };

            // If all products are in stock, update them in a single pass
            productDocs.forEach(({ docRef, newStock }) => {
                transaction.update(docRef, { stock: newStock });
            });

            // Return success if all products were updated
            return { success: true, outOfStockProducts: [] };
        });
    } catch (error) {
        console.error('Error checking product stock and updating:', error);
        if (error.message.includes('ya no tiene suficiente stock')) {
            // Return error message if there is not enough stock for a product
            return { success: false, message: 'El stock ha cambiado. No hay suficiente stock para completar la compra.' };
        }
        throw new Error(error.message || 'Error al verificar el stock de los productos y actualizarlo');
    }
};

// Function to create a new product in Firestore
const createProduct = async (product) => {
    try {
        // Adapt product data to Firestore schema
        const adaptedProduct = createProductAdapter(product);
        // Add product to the collection
        const docRef = await addDoc(collection(db, 'products'), adaptedProduct);
        // Get the product data
        const docSnapshot = await getDoc(docRef);
        // Return product data with ID
        return { id: docRef.id, ...docSnapshot.data() };
    } catch (error) {
        console.error('Error creating product:', error);
        throw new Error(error.message || 'Error al crear el producto');
    }
};

// Function to update a product in Firestore
const updateProduct = async (id, product) => {
    try {
        // Create a reference to the product document
        const docRef = doc(db, 'products', id);
        // Update the product
        await updateDoc(docRef, product);
        // Return true if the update was successful
        return true;
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error(error.message || 'Error al actualizar el producto');
    }
};

// Function to delete a product from Firestore
const deleteProduct = async (id) => {
    try {
        // Create a reference to the product document
        const docRef = doc(db, 'products', id);
        // Delete the product
        await deleteDoc(docRef);
        // Return true if the deletion was successful
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error(error.message || 'Error al eliminar el producto');
    }
}

export { fetchProducts, fetchCategories, fetchProductById, checkProductStockAndUpdate, createProduct, updateProduct, deleteProduct };