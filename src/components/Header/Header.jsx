import HeaderLogo from './HeaderLogo';
import HeaderNavBar from './HeaderNavBar';

function Header() {
    return (
        <header className="header-container d-flex align-items-center justify-content-between px-3">
            <HeaderLogo />
            <HeaderNavBar />
        </header>
    );
}

export default Header;