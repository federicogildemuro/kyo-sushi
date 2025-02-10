import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { scrollToTop } from '../utils/scrollUtils';
import Spinner from '../components/spinner/Spinner';

const UserRoute = ({ children }) => {
    const { isAdmin, loading } = useAuth();

    if (loading) return (
        <>
            <Spinner />
            {children}
        </>
    );

    if (isAdmin) {
        scrollToTop();
        return <Navigate to="/admin" />;
    }

    return children;
};

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return (
        <>
            <Spinner />
            {children}
        </>
    );

    if (user) {
        scrollToTop();
        return <Navigate to="/" />;
    }

    return children;
};

const AuthenticatedRoute = ({ children }) => {
    const { user, isAdmin, loading } = useAuth();

    if (loading) return (
        <>
            <Spinner />
            {children}
        </>
    );

    if (!user) {
        scrollToTop();
        return <Navigate to="/" />;
    }

    if (isAdmin) {
        scrollToTop();
        return <Navigate to="/admin" />;
    }

    return children;
};

const AdminRoute = ({ children }) => {
    const { user, isAdmin, loading } = useAuth();

    if (loading) return (
        <>
            <Spinner />
            {children}
        </>
    );

    if (!user || !isAdmin) {
        scrollToTop();
        return <Navigate to="/" />;
    }

    return children;
};

export { UserRoute, PublicRoute, AuthenticatedRoute, AdminRoute };