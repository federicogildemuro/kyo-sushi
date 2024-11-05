import './NavBar.css'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { getCategories } from '../../services/ProductsServices'
import NavbarLogo from '../NavbarLogo/NavbarLogo'
import CartWidget from '../CartWidget/CartWidget'

function NavBar() {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

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
                            <Link className="nav-link" aria-current="page" to="/">Inicio</Link>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Menú</a>

                            <ul className="dropdown-menu">
                                {categories.map(category => (
                                    <li key={category}>
                                        <NavLink className="dropdown-item" to={`/category/${category}`}>{category}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contacto</Link>
                        </li>
                    </ul>
                </div>

                <CartWidget />
            </div>
        </nav>
    )
}

export default NavBar