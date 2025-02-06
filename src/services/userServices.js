import { doc, setDoc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset } from 'firebase/auth';
import { auth, db } from './firebaseServices';
import { createUserAdapter } from '../adapters/userAdapters';

const createUser = async (email, password, userData) => {
    try {
        const firebaseUser = await createUserWithEmailAndPassword(auth, email, password);
        const userId = firebaseUser.user.uid;
        const userRef = doc(db, 'users', userId);
        const adaptedUserData = createUserAdapter({ ...userData });
        await setDoc(userRef, adaptedUserData);
        return true;
    } catch (error) {
        console.error(error);
        if (error.code === 'auth/email-already-in-use') {
            throw new Error('Ya existe un usuario registrado con ese correo electrónico');
        }
        throw new Error(error.message || 'Error al crear el usuario');
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
        console.error(error);
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
        const userDoc = querySnapshot.docs[0];
        return { id: userDoc.id, ...userDoc.data() };
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al obtener el usuario');
    }
};

const resetPassword = async (email) => {
    try {
        const userData = await getUserByEmail(email);
        if (!userData) {
            throw new Error('No existe un usuario registrado con el correo electrónico ingresado');
        }
        await sendPasswordResetEmail(auth, email);
        return true;
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al enviar el correo de restablecimiento de contraseña');
    }
};

const updatePassword = async (oobCode, newPassword) => {
    try {
        await confirmPasswordReset(auth, oobCode, newPassword);
        return true;
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al actualizar la contraseña');
    }
};

const updateUserLastLogin = async (id) => {
    try {
        const userRef = doc(db, 'users', id);
        await setDoc(userRef, { lastLogin: new Date().toISOString() }, { merge: true });
        return true;
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error al actualizar la fecha de último acceso');
    }
};

export { createUser, getUserById, getUserByEmail, resetPassword, updatePassword, updateUserLastLogin };