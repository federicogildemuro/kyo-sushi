import { useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import AdminNavLinks from './AdminNavLinks';
import UserNavLinks from './UserNavLinks';

function MobileNavMenu({ isOpen, closeMenu }) {
    const { isAdmin } = useAuth();
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
                />
            </div>

            <div className="offcanvas-body">
                <div className="d-flex flex-column align-items-center gap-3">
                    {isAdmin ? <AdminNavLinks isMenuOpen={true} /> : <UserNavLinks isMenuOpen={true} />}
                </div>
            </div>
        </div>
    );
}

export default MobileNavMenu;