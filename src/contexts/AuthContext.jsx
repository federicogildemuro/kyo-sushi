import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/FirebaseServices';
import { createUser, getUserById, updateUserLastLogin } from '../services/UsersServices';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const register = async (email, password, userData) => {
        try {
            const firebaseUser = await createUserWithEmailAndPassword(auth, email, password);
            const userId = firebaseUser.user.uid;
            await createUser(userId, userData);
            return firebaseUser;
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                throw new Error('Ya existe un usuario registrado con ese correo electrónico');
            }
            throw new Error(error.message || 'Error registrando usuario');
        }
    };

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
                await createUser(userId, {
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
                    metadata: {
                        createdAt: new Date().toISOString(),
                        lastLogin: new Date().toISOString(),
                    },
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
        } catch (error) {
            throw new Error(error.message || 'Error cerrando sesión');
        }
    };

    const obj = {
        user,
        register,
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