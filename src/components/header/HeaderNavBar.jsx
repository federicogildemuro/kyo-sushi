import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import AdminLinks from './AdminLinks';
import UserLinks from './UserLinks';
import HamburgerButton from './HamburgerButton';
import MobileNavMenu from './MobileNavMenu';
import CartWidget from './CartWidget';
import AuthWidget from './AuthWidget';

function HeaderNavBar() {
    const { isAdmin } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    return (
        <nav className="d-flex justify-content-around justify-content-lg-center align-items-center gap-3 gap-sm-5">
            <div className="d-none d-lg-flex">
                {isAdmin ? <AdminLinks /> : <UserLinks />}
            </div>

            <div className="d-lg-none">
                <HamburgerButton
                    isOpen={isMenuOpen}
                    toggleMenu={toggleMenu}
                />

                <MobileNavMenu
                    isOpen={isMenuOpen}
                    closeMenu={toggleMenu}
                />
            </div>

            <CartWidget />

            <AuthWidget />
        </nav>
    );
}

export default HeaderNavBar;