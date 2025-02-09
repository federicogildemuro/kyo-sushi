import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../services/firebaseServices';
import { getUserById } from '../services/userServices';
import { isSessionExpired, setLoginTime, clearLoginTime } from '../utils/sessionUtils';

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
                    if (isSessionExpired()) {
                        await signOut(auth);
                        clearLoginTime();
                        return;
                    }

                    await fetchAndSetUser(firebaseUser);
                } else {
                    setUser(null);
                    setIsAdmin(false);
                    clearLoginTime();
                }
            } catch (error) {
                setError(error.message || 'Error verificando el cambio en el estado de autenticación');
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchAndSetUser = async (firebaseUser) => {
        try {
            const userData = await getUserById(firebaseUser.uid);
            setUser({ ...firebaseUser, userData });
            setIsAdmin(userData?.role === 'admin');
        } catch (error) {
            setError(error.message || 'Error obteniendo datos del usuario');
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setLoginTime();
            return true;
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/invalid-credential') {
                setError('Correo electrónico y/o contraseña incorrectos.');
            } else if (error.code === 'auth/too-many-requests') {
                setError('Demasiados intentos fallidos, espere unos minutos y vuelva a intentarlo');
            } else {
                setError(error.message || 'Error iniciando sesión');
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
            clearLoginTime();
            return true;
        } catch (error) {
            console.error(error);
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
        logout,
    };

    return (
        <AuthContext.Provider value={obj}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };