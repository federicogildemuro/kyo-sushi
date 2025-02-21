import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchCategories } from '../../services/productsServices';
import useAsync from '../../hooks/useAsync';

function CategoriesDropdownMenu() {
    // Fetch the categories using the useAsync hook
    const { data: categories, loading } = useAsync(fetchCategories);
    // State to handle the dropdown menu
    const [isOpen, setisOpen] = useState(false);
    // State to handle the focused index of the dropdown items
    const [focusedIndex, setFocusedIndex] = useState(null);
    // Refs to handle the dropdown menu and items
    const dropdownRef = useRef(null);
    const dropdownItemsRef = useRef([]);

    // Handle the toggle of the dropdown menu
    const toggleDropdown = () => {
        setisOpen(prev => !prev);
    };

    // Close the dropdown menu when clicking outside of it
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

    // Handle the keyboard navigation of the dropdown menu
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

    // Render the categories
    const renderDropdownMenu = () => {
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

        // Map the categories to create the dropdown items
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

            {/* Render the dropdown menu if it is open */}
            {isOpen && (
                <ul className="dropdown-menu d-flex flex-column align-items-center">
                    {renderDropdownMenu()}
                </ul>
            )}
        </li>
    );
}

export default CategoriesDropdownMenu;