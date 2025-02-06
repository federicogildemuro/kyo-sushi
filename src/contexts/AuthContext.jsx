import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../services/firebaseServices';
import { getUserById, updateUserLastLogin } from '../services/userServices';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setError(null);
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
        setLoading(true);
        setError(null);
        try {
            const firebaseUser = await signInWithEmailAndPassword(auth, email, password);
            const userId = firebaseUser.user.uid;
            await updateUserLastLogin(userId);
            return true;
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/invalid-credential') {
                setError('Correo electrónico y/o contraseña incorrectos.');
            } else if (error.code === 'auth/too-many-requests') {
                setError('Demasiados intentos fallidos, espere unos minutos y vuelva a intentarlo');
            } else {
                setError('Error iniciando sesión');
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null);
        try {
            await signOut(auth);
            return true;
        } catch (error) {
            console.error(error);
            setError('Error cerrando sesión');
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
        logout,
    };

    return (
        <AuthContext.Provider value={obj}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };