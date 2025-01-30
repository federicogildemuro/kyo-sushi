import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../services/FirebaseServices';
import { createGoogleUser, getUserById, updateUserLastLogin } from '../services/UsersServices';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userData = await getUserById(firebaseUser.uid);
                setUser({ ...firebaseUser, userData });
                if (userData.role === 'admin') {
                    setIsAdmin(true);
                }
            } else {
                setUser(null);
                setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            const firebaseUser = await signInWithEmailAndPassword(auth, email, password);
            const userId = firebaseUser.user.uid;
            await updateUserLastLogin(userId);
            return firebaseUser;
        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                throw new Error('Correo electrónico y/o contraseña incorrectos');
            }
            throw new Error(error.message || 'Error iniciando sesión');
        }
    };

    const loginWithGoogle = async () => {
        try {
            const firebaseUser = await signInWithPopup(auth, googleProvider);
            const userId = firebaseUser.user.uid;
            const userData = await getUserById(userId);
            if (!userData) {
                await createGoogleUser(userId, {
                    firstName: firebaseUser.user.displayName,
                    lastName: '',
                    email: firebaseUser.user.email,
                    phone: '',
                    street: '',
                    number: '',
                    apartment: '',
                    city: '',
                    state: '',
                    country: '',
                    role: 'user',
                    lastLogin: new Date().toISOString()
                });
            } else {
                await updateUserLastLogin(userId);
            }
            return firebaseUser;
        } catch (error) {
            throw new Error(error.message || 'Error iniciando sesión con Google');
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            return true;
        } catch (error) {
            throw new Error(error.message || 'Error cerrando sesión');
        }
    };

    const obj = {
        user,
        isAdmin,
        login,
        loginWithGoogle,
        logout,
    };

    return (
        <AuthContext.Provider value={obj}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };