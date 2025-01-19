import { db } from './FirebaseServices';
import { doc, setDoc, getDoc } from 'firebase/firestore';

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

const updateUserLastLogin = async (id) => {
    try {
        const userRef = doc(db, 'users', id);
        await setDoc(userRef, { metadata: { lastLogin: new Date().toISOString() } }, { merge: true });
    } catch (error) {
        throw new Error(error.message || 'Error al actualizar la fecha de último acceso');
    }
};

export { createUser, getUserById, updateUserLastLogin };