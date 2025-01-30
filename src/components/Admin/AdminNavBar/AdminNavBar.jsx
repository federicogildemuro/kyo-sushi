import { NavLink } from 'react-router-dom';
import { scrollToTop } from '../../../utils/ScrollUtils';
import './AdminNavBar.css';

function AdminNavBar({ handleLogout }) {
    return (
        <nav>
            <button
                className="navbar-toggler ms-auto"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                    <li className="nav-item">
                        <NavLink
                            to="/admin"
                            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                            onClick={scrollToTop}
                        >
                            Inicio
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/admin/products"
                            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                            onClick={scrollToTop}
                        >
                            Productos
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            to="/admin/orders"
                            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                            onClick={scrollToTop}
                        >
                            Órdenes
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            to="/admin/users"
                            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                            onClick={scrollToTop}
                        >
                            Usuarios
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <button
                            className="nav-link btn btn-link"
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default AdminNavBar;