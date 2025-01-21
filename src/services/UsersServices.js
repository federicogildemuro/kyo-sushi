import { db } from './FirebaseServices';
import { doc, setDoc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';

const createUser = async (id, data) => {
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
        return { id: userDoc.id, ...userDoc.data() };
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

const updateUser = async (id, data) => {
    try {
        const userRef = doc(db, 'users', id);
        await setDoc(userRef, data, { merge: true });
        return { id, ...data };
    } catch (error) {
        throw new Error(error.message || 'Error al actualizar el usuario');
    }
}

const updateUserLastLogin = async (id) => {
    try {
        const userRef = doc(db, 'users', id);
        await setDoc(userRef, { metadata: { lastLogin: new Date().toISOString() } }, { merge: true });
        return true;
    } catch (error) {
        throw new Error(error.message || 'Error al actualizar la fecha de último acceso');
    }
};

export { createUser, getUserById, getUserByEmail, updateUser, updateUserLastLogin };