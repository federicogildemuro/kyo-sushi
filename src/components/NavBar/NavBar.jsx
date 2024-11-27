import { NavLink } from 'react-router-dom';
import NavbarLogo from '../NavbarLogo/NavbarLogo';
import CartWidget from '../CartWidget/CartWidget';
import './NavBar.css';

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-custom">
            <div className="container-fluid">
                <NavbarLogo />

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/">Inicio</NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Tienda</a>

                            <ul className="dropdown-menu">
                                <li>
                                    <NavLink className="dropdown-item" to="/tienda">Todos</NavLink>
                                </li>

                                <li>
                                    <NavLink className="dropdown-item" to="/tienda/Rolls">Rolls</NavLink>
                                </li>

                                <li>
                                    <NavLink className="dropdown-item" to="/tienda/Hot Rolls">Hot Rolls</NavLink>
                                </li>

                                <li>
                                    <NavLink className="dropdown-item" to="/tienda/Sin Alga y sin Arroz">Sin Alga y sin Arroz</NavLink>
                                </li>

                                <li>
                                    <NavLink className="dropdown-item" to="/tienda/Veggies">Veggies</NavLink>
                                </li>

                                <li>
                                    <NavLink className="dropdown-item" to="/tienda/Makis">Makis</NavLink>
                                </li>

                                <li>
                                    <NavLink className="dropdown-item" to="/tienda/Sashimis">Sashimis</NavLink>
                                </li>

                                <li>
                                    <NavLink className="dropdown-item" to="/tienda/Entrantes">Entrantes</NavLink>
                                </li>

                                <li>
                                    <NavLink className="dropdown-item" to="/tienda/Niguiris">Niguiris</NavLink>
                                </li>

                                <li>
                                    <NavLink className="dropdown-item" to="/tienda/Salsas">Salsas</NavLink>
                                </li>

                                <li>
                                    <NavLink className="dropdown-item" to="/tienda/Combinados">Combinados</NavLink>
                                </li>

                            </ul>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contacto</NavLink>
                        </li>
                    </ul>
                </div>

                <CartWidget />
            </div>
        </nav>
    );
};

export default NavBar;