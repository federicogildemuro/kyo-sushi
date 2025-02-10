import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAsync from '../../hooks/useAsync';
import { fetchCategories } from '../../services/productsServices';
import { scrollToTop } from '../../utils/scrollUtils';

function CategoriesDropdownMenu() {
    const { data: categories, loading } = useAsync(fetchCategories);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsDropdownOpen(false);
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const renderCategories = () => {
        if (loading) {
            return (
                <li className="text-center">
                    <span className="dropdown-item disabled">Cargando...</span>
                </li>
            );
        }

        if (!categories || categories.length === 0) {
            return (
                <li className="text-center">
                    <span className="dropdown-item disabled">No hay categorías disponibles</span>
                </li>
            );
        }

        return categories.map((category) => (
            <li
                key={category}
                className="text-center w-100"
            >
                <NavLink
                    to={`/tienda/${category}`}
                    className={({ isActive }) => (isActive ? 'dropdown-item active' : 'dropdown-item')}
                    onClick={() => {
                        scrollToTop();
                        setIsDropdownOpen(false);
                    }}
                >
                    {category}
                </NavLink>
            </li>
        ));
    };

    return (
        <li
            className="nav-item dropdown text-center"
            ref={dropdownRef}
        >
            <button
                className="nav-link"
                type="button"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
            >
                Menú
                <i className={`bi ${isDropdownOpen ? 'bi-caret-up-fill' : 'bi-caret-down-fill'} ms-2`} />
            </button>

            {isDropdownOpen && (
                <ul className="dropdown-menu d-flex flex-column align-items-center">
                    {renderCategories()}
                </ul>
            )}
        </li>
    );
}

export default CategoriesDropdownMenu;