import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAsync from '../../hooks/useAsync';
import { fetchCategories } from '../../services/productsServices';

function CategoriesDropdownMenu() {
    // Get the products categories
    const { data: categories, loading } = useAsync(fetchCategories);

    // Handle menu opening and closing
    const [isOpen, setisOpen] = useState(false);
    const dropdownItemsRef = useRef([]);
    const toggleDropdown = () => {
        setisOpen(prev => !prev);
    };

    // Handle the click outside the menu to close it
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setisOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Handle the keyboard navigation of the menu
    const [focusedIndex, setFocusedIndex] = useState(null);
    const handleKeyDown = (event) => {
        if (!isOpen) return;
        if (event.key === 'ArrowDown') {
            setFocusedIndex((prev) => Math.min(prev + 1, categories.length - 1));
        } else if (event.key === 'ArrowUp') {
            setFocusedIndex((prev) => Math.max(prev - 1, 0));
        } else if (event.key === 'Enter' && focusedIndex !== null) {
            dropdownItemsRef.current[focusedIndex]?.click();
        }
    };

    // Render menu items
    const renderMenuItems = () => {
        // If the data is loading, show a loading message
        if (loading) {
            return (
                <li className="text-center">
                    <span className="dropdown-item disabled">Cargando...</span>
                </li>
            );
        }
        // If there are no categories, show a message
        if (!categories || categories.length === 0) {
            return (
                <li className="text-center">
                    <span className="dropdown-item disabled">No hay categorías disponibles</span>
                </li>
            );
        }
        // Map the categories to create the menu items
        return categories.map((category, index) => (
            <li
                key={category}
                className="text-center w-100"
                role="menuitem"
                onFocus={() => setFocusedIndex(index)}
            >
                <NavLink
                    to={`/tienda/${category}`}
                    className={({ isActive }) => (isActive ? 'dropdown-item active' : 'dropdown-item')}
                    onClick={toggleDropdown}
                    ref={(el) => (dropdownItemsRef.current[index] = el)}
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
            onKeyDown={handleKeyDown}
            role="menu"
        >
            <button
                className="nav-link"
                type="button"
                onClick={toggleDropdown}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                Menú
                <i
                    className={`bi ${isOpen ? 'bi-caret-up-fill' : 'bi-caret-down-fill'} ms-2`}
                    aria-hidden="true"
                    aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                />
            </button>

            {/* Render the menu if it is open */}
            {isOpen && (
                <ul className="dropdown-menu d-flex flex-column align-items-center">
                    {renderMenuItems()}
                </ul>
            )}
        </li>
    );
}

export default CategoriesDropdownMenu;