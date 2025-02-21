import { doc, setDoc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset } from 'firebase/auth';
import { auth, db } from './firebaseServices';
import { createUserAdapter, updateUserAdapter } from '../adapters/userAdapters';

// Function to create a new user in Firebase Authentication and Firestore
const createUser = async (email, password, userData) => {
    try {
        // Create a new user in Firebase Authentication
        const firebaseUser = await createUserWithEmailAndPassword(auth, email, password);
        // Create a reference to the user document in Firestore
        const userId = firebaseUser.user.uid;
        // Create a new user document in Firestore
        const docRef = doc(db, 'users', userId);
        // Adapt user data to Firestore schema
        const adaptedUserData = createUserAdapter({ ...userData });
        // Set the user document in Firestore
        await setDoc(docRef, adaptedUserData);
        // Return true if the user was created successfully
        return true;
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 'auth/email-already-in-use') throw new Error('Ya existe un usuario registrado con ese correo electrónico');
        throw new Error(error.message || 'Error al crear el usuario');
    }
};

// Function to fetch the role of a user from Firestore
const fetchUserRole = async (userId) => {
    try {
        // Create a reference to the user document
        const docRef = doc(db, 'users', userId);
        // Fetch the user document
        const docSnap = await getDoc(docRef);
        // Return null if the user doesn't exist
        if (!docSnap.exists()) return null;
        // Return the role of the user
        return docSnap.data().role;
    } catch (error) {
        console.error('Error getting user role:', error);
        throw new Error(error.message || 'Error al obtener el rol del usuario');
    }
}

// Function to fetch a user by its ID from Firestore
const fetchUserById = async (id) => {
    try {
        // Create a reference to the user document
        const docRef = doc(db, 'users', id);
        // Fetch the user document
        const docSnap = await getDoc(docRef);
        // Return null if the user doesn't exist
        if (!docSnap.exists()) return null;
        // Return the user data
        return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
        console.error('Error getting user by id:', error);
        throw new Error(error.message || 'Error al obtener el usuario');
    }
};

// Function to fetch a user by its email from Firestore
const fetchUserByEmail = async (email) => {
    try {
        // Create a reference to the users collection
        const docsRef = collection(db, 'users');
        // Create a query to fetch the user by email
        const querySnapshot = await getDocs(query(docsRef, where('email', '==', email)));
        // Return null if the user doesn't exist
        if (querySnapshot.empty) return null;
        // Get the user data
        const docSnap = querySnapshot.docs[0];
        // Return the user data
        return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
        console.error('Error getting user by email:', error);
        throw new Error(error.message || 'Error al obtener el usuario');
    }
};

// Function to send a password reset email to a user
const resetPassword = async (email) => {
    try {
        // Fetch the user data by email
        const userData = await fetchUserByEmail(email);
        // Throw an error if the user doesn't exist
        if (!userData) throw new Error('No existe un usuario registrado con el correo electrónico ingresado');
        // Send a password reset email
        await sendPasswordResetEmail(auth, email);
        // Return true if the email was sent successfully
        return true;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error(error.message || 'Error al enviar el correo de restablecimiento de contraseña');
    }
};

// Function to update the password of a user
const updatePassword = async (oobCode, newPassword) => {
    try {
        // Confirm the password reset
        await confirmPasswordReset(auth, oobCode, newPassword);
        // Return true if the password was updated successfully
        return true;
    } catch (error) {
        console.error('Error updating password:', error);
        throw new Error(error.message || 'Error al actualizar la contraseña');
    }
};

// Function to update a user in Firestore
const updateUser = async (id, userData) => {
    try {
        // Adapt user data to Firestore schema
        const adaptedUserData = updateUserAdapter({ ...userData });
        // Create a reference to the user document
        const docRef = doc(db, 'users', id);
        // Update the user document
        await setDoc(docRef, adaptedUserData, { merge: true });
        // Return true if the user was updated successfully
        return true;
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error(error.message || 'Error al actualizar el usuario');
    }
};

export { createUser, fetchUserRole, fetchUserById, resetPassword, updatePassword, updateUser };