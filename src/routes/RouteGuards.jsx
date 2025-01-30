import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const UserRoute = ({ children }) => {
    const { isAdmin } = useAuth();
    if (isAdmin) {
        return <Navigate to="/admin" />;
    }
    return children;
}

const PublicRoute = ({ children }) => {
    const { user } = useAuth();
    if (user) {
        return <Navigate to="/" />;
    }
    return children;
}

const AuthenticatedRoute = ({ children }) => {
    const { user, isAdmin } = useAuth();
    if (!user) {
        return <Navigate to="/" />;
    } else if (isAdmin) {
        return <Navigate to="/admin" />;
    }
    return children;
}

const AdminRoute = ({ children }) => {
    const { user, isAdmin } = useAuth();
    if (!user || !isAdmin) {
        return <Navigate to="/" />;
    }
    return children;
}

export { UserRoute, PublicRoute, AuthenticatedRoute, AdminRoute };