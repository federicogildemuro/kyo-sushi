import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import NavBar from '../NavBar/NavBar';
import AdminNavBar from '../Admin/AdminNavBar/AdminNavBar';
import Spinner from '../Spinner/Spinner';
import './Header.css';

function Header() {
    const { user, isAdmin, logout, loading, error } = useAuth();
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            showNotification('Ha ocurrido un error cerrando la sesión', 'danger');
        }
    }, [error, showNotification]);

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            navigate('/');
        }
    }

    return (
        <header className="navbar navbar-expand-lg navbar-custom">
            {loading && <Spinner />}

            <div className="container-fluid">
                <HeaderLogo />

                {user && isAdmin
                    ? <AdminNavBar handleLogout={handleLogout} />
                    : <NavBar handleLogout={handleLogout} />
                }
            </div>
        </header >
    );
}

export default Header;