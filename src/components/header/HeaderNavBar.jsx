import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import AdminLinks from './AdminLinks';
import UserLinks from './UserLinks';
import HamburgerButton from './HamburgerButton';
import MobileNavMenu from './MobileNavMenu';
import CartWidget from './CartWidget';
import AuthWidget from './AuthWidget';

function HeaderNavBar() {
    // Get the isAdmin value from the useAuth hook
    const { isAdmin } = useAuth();

    // Handle the mobile menu opening and closing
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    return (
        <nav className="d-flex justify-content-around justify-content-lg-center align-items-center gap-3 gap-sm-5">
            <div className="d-none d-lg-flex">
                {/* Render the AdminLinks component if the user is an admin, otherwise render the UserLinks component */}
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