import { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import AdminNavLinks from './AdminNavLinks';
import UserNavLinks from './UserNavLinks';
import AuthenticatedUserNavLinks from './AuthenticatedUserNavLinks';
import HamburgerButton from './HamburgerButton';

function HeaderNavBar() {
    const { isAdmin } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    return (
        <nav>
            <div className="d-none d-lg-flex">
                {isAdmin ? <AdminNavLinks /> : <UserNavLinks />}

                <AuthenticatedUserNavLinks />
            </div>

            <div className="d-lg-none">
                <HamburgerButton
                    isOpen={isMenuOpen}
                    toggleMenu={toggleMenu}
                />

                {isMenuOpen && (
                    <div className="custom-offcanvas offcanvas offcanvas-end show" ref={menuRef}>
                        <div className="offcanvas-header">
                            <i className="nav-bar-icon bi bi-x" onClick={closeMenu} />
                        </div>

                        <div className="offcanvas-body">
                            <div className="d-flex flex-column align-items-center gap-3">
                                {isAdmin
                                    ? <AdminNavLinks isMenuOpen={isMenuOpen} />
                                    : <UserNavLinks isMenuOpen={isMenuOpen} />
                                }
                                <AuthenticatedUserNavLinks isMenuOpen={isMenuOpen} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default HeaderNavBar;