import { db } from './FirebaseServices';
import { doc, setDoc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';

const createUser = async (id, data) => {
    if (!id) {
        throw new Error('El ID del usuario es obligatorio');
    }
    if (!data || typeof data !== 'object') {
        throw new Error('Los datos del usuario son inválidos o están vacíos');
    }
    try {
        const userRef = doc(db, 'users', id);
        await setDoc(userRef, data);
        return { id, ...data };
    } catch (error) {
        throw new Error(error.message || 'Error al registrar el usuario');
    }
};

const getUserById = async (id) => {
    try {
        const userDoc = await getDoc(doc(db, 'users', id));
        if (!userDoc.exists()) {
            return null;
        }
        return userDoc.data();
    } catch (error) {
        throw new Error(error.message || 'Error al obtener el usuario');
    }
};

const getUserByEmail = async (email) => {
    try {
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(query(usersRef, where('email', '==', email)));
        if (querySnapshot.empty) {
            return null;
        }
        return querySnapshot.docs[0].data();
    } catch (error) {
        throw new Error(error.message || 'Error al obtener el usuario');
    }
};

const updateUserLastLogin = async (id) => {
    try {
        const userRef = doc(db, 'users', id);
        await setDoc(userRef, { metadata: { lastLogin: new Date().toISOString() } }, { merge: true });
    } catch (error) {
        throw new Error(error.message || 'Error al actualizar la fecha de último acceso');
    }
};

export { createUser, getUserById, getUserByEmail, updateUserLastLogin };