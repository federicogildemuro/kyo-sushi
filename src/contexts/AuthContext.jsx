import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../services/FirebaseServices';
import { createGoogleUser, getUserById, updateUserLastLogin } from '../services/UsersServices';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            try {
                if (firebaseUser) {
                    const userData = await getUserById(firebaseUser.uid);
                    setUser({ ...firebaseUser, userData });
                    setIsAdmin(userData?.role === 'admin');
                } else {
                    setUser(null);
                    setIsAdmin(false);
                }
            } catch (error) {
                setError(error.message || 'Error obteniendo datos de usuario');
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const firebaseUser = await signInWithEmailAndPassword(auth, email, password);
            const userId = firebaseUser.user.uid;
            await updateUserLastLogin(userId);
            return true;
        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                setError('Correo electrónico y/o contraseña incorrectos');
            }
            setError(error.message || 'Error iniciando sesión');
        } finally {
            setLoading(false);
        }
    };

    const loginWithGoogle = async () => {
        try {
            setLoading(true);
            const firebaseUser = await signInWithPopup(auth, googleProvider);
            const userId = firebaseUser.user.uid;
            const userData = await getUserById(userId);
            if (!userData) {
                await createGoogleUser(userId, {
                    firstName: firebaseUser.user.displayName,
                    role: 'user',
                    lastLogin: new Date().toISOString()
                });
            } else {
                await updateUserLastLogin(userId);
            }
            return true;
        } catch (error) {
            setError(error.message || 'Error iniciando sesión con Google');
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await signOut(auth);
            return true;
        } catch (error) {
            setError(error.message || 'Error cerrando sesión');
        } finally {
            setLoading(false);
        }
    };

    const obj = {
        user,
        isAdmin,
        loading,
        error,
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