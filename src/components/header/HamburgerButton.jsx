function HamburgerButton({ isOpen, toggleMenu }) {
    return (
        <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
        >
            <i
                className="nav-bar-icon bi bi-list"
                aria-hidden="true"
            />
        </button>
    );
}

export default HamburgerButton;