import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { scrollToTop } from '../utils/scrollUtils';
import Spinner from '../components/spinner/Spinner';

// Guard for users who are not admins
const UserRoute = ({ children }) => {
    const { isAdmin, loading } = useAuth();

    // Show a spinner while checking the authentication status
    if (loading) return (
        <>
            <Spinner />
            {children}
        </>
    );

    // Redirect admin users to the admin page
    if (isAdmin) {
        scrollToTop();
        return <Navigate to="/admin" />;
    }

    // Render children components if the user is not an admin
    return children;
};

// Guard for public routes that require the user to not be logged in
const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // Show a spinner while checking the authentication status
    if (loading) return (
        <>
            <Spinner />
            {children}
        </>
    );

    // Redirect authenticated users to the homepage
    if (user) {
        scrollToTop();
        return <Navigate to="/" />;
    }

    // Render children components if the user is not authenticated
    return children;
};

// Guard for routes that require authentication
const AuthenticatedRoute = ({ children }) => {
    const { user, isAdmin, loading } = useAuth();

    // Show a spinner while checking the authentication status
    if (loading) return (
        <>
            <Spinner />
            {children}
        </>
    );

    // Redirect non-authenticated users to the homepage
    if (!user) {
        scrollToTop();
        return <Navigate to="/" />;
    }

    // Redirect admin users to the admin page
    if (isAdmin) {
        scrollToTop();
        return <Navigate to="/admin" />;
    }

    // Render children components if the user is authenticated and not an admin
    return children;
};

// Guard for admin-only routes
const AdminRoute = ({ children }) => {
    const { user, isAdmin, loading } = useAuth();

    // Show a spinner while checking the authentication status
    if (loading) return (
        <>
            <Spinner />
            {children}
        </>
    );

    // Redirect non-authenticated or non-admin users to the homepage
    if (!user || !isAdmin) {
        scrollToTop();
        return <Navigate to="/" />;
    }

    // Render children components if the user is authenticated and an admin
    return children;
};

export { UserRoute, PublicRoute, AuthenticatedRoute, AdminRoute };