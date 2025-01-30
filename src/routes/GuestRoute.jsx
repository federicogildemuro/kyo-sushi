import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function GuestRoute({ children }) {
    const { user } = useAuth();

    return user ? <Navigate to="/tienda" /> : children;
}

export default GuestRoute;