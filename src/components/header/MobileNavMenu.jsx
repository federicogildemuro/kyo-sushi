import { useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import AdminLinks from './AdminLinks';
import UserLinks from './UserLinks';

function MobileNavMenu({ isOpen, closeMenu }) {
    // Get the isAdmin value from the useAuth hook
    const { isAdmin } = useAuth();

    // Handle the click outside the  menu to close it
    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, closeMenu]);

    // Don't render the menu if it's not open
    if (!isOpen) return null;

    return (
        <div
            ref={menuRef}
            className="custom-offcanvas offcanvas offcanvas-end show"
        >
            <div className="offcanvas-header">
                <button
                    className="btn-close"
                    onClick={closeMenu}
                    aria-label="Cerrar menú"
                />
            </div>

            <div className="offcanvas-body">
                <div className="d-flex flex-column align-items-center gap-3">
                    {/* Render the AdminLinks component if the user is an admin, otherwise render the UserLinks component */}
                    {isAdmin ? <AdminLinks isMenuOpen={true} /> : <UserLinks isMenuOpen={true} />}
                </div>
            </div>
        </div>
    );
}

export default MobileNavMenu;