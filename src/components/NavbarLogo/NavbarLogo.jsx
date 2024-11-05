import './NavbarLogo.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

function NavbarLogo() {
    return (
        <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo kyo-sushi" />
        </Link>
    )
}

export default NavbarLogo