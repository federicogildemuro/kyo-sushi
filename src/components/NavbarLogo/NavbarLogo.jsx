import './NavbarLogo.css'
import logo from '../../assets/logo.png'

function NavbarLogo() {
    return (
        <a className="navbar-brand" href="#">
            <img src={logo} alt="logo kyo-sushi" />
        </a>
    )
}

export default NavbarLogo