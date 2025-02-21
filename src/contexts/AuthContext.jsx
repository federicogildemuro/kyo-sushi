import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../services/firebaseServices';
import { fetchUserRole } from '../services/userServices';
import { isSessionExpired, setLoginTime, clearLoginTime } from '../utils/sessionUtils';

// Create context to provide authentication state throughout the app
const AuthContext = createContext();

function AuthProvider({ children }) {
    // State to store user, admin status, loading state, and any errors
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Subscribe to Firebase authentication state changes
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setError(null);
            setLoading(true);

            if (firebaseUser) {
                // Check if the session has expired
                if (isSessionExpired()) {
                    signOut(auth);
                    clearLoginTime();
                    return;
                }
                setUser(firebaseUser);
                // Fetch user role and set admin status
                const role = await fetchUserRole(firebaseUser.uid);
                setIsAdmin(role === 'admin');
            } else {
                // If no user is authenticated, clear state
                setUser(null);
                setIsAdmin(false);
                clearLoginTime();
            }
            setLoading(false);
        });

        // Cleanup on unmount
        return () => unsubscribe();
    }, []);

    // Login function using email and password
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
                setError('Incorrect email or password.');
            } else if (error.code === 'auth/too-many-requests') {
                setError('Too many failed attempts, please wait and try again.');
            } else {
                setError(error.message || 'Error logging in');
            }
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = async () => {
        setLoading(true);
        setError(null);
        try {
            await signOut(auth);
            clearLoginTime();
            return true;
        } catch (error) {
            console.error(error);
            setError(error.message || 'Error logging out');
        } finally {
            setLoading(false);
        }
    };

    // Context value to be provided to children
    const obj = {
        user,
        isAdmin,
        loading,
        error,
        login,
        logout,
    };

    return (
        // Provide context to the app components
        <AuthContext.Provider value={obj}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };