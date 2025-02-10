function HamburgerButton({ isOpen, toggleMenu }) {
    return (
        <button
            className="navbar-toggler"
            type="button"
            aria-expanded={isOpen ? 'true' : 'false'}
            onClick={toggleMenu}
        >
            <i className="nav-bar-icon bi bi-list" />
        </button>
    );
}

export default HamburgerButton;