import HeaderLogo from './HeaderLogo';
import HeaderNavBar from './HeaderNavBar';
import './Header.css';

function Header() {
    return (
        <header className="header-container d-flex align-items-center justify-content-between w-100 px-3 px-lg-5">
            <HeaderLogo />
            <HeaderNavBar />
        </header>
    );
}

export default Header;