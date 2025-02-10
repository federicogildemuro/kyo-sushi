import { useState } from 'react';
import FiltersMenu from '../../../components/filters-menu/FiltersMenu';
import SortButtons from '../../../components/sort-buttons/SortButtons';
import { Link } from 'react-router-dom';

function AdminProductsHeader({ items, filteredItems, handleFilterChange, handleSortChange }) {
    const [visibleMenu, setVisibleMenu] = useState(null);

    const toggleMenu = (menu) => {
        setVisibleMenu(prevMenu => (prevMenu === menu ? null : menu));
    };

    const sortFields = [
        { name: 'Nombre', key: 'title' },
        { name: 'Categoría', key: 'category' },
        { name: 'Precio', key: 'price' },
        { name: 'Stock', key: 'stock' }
    ];

    return (
        <>
            <div className="d-flex justify-content-center mt-5">
                <Link
                    to="/admin/products/new"
                    className="btn custom-btn"
                >
                    <i className="bi bi-plus me-2" />
                    Crear producto
                </Link>
            </div>

            <div className="d-flex gap-3 justify-content-center mt-5">
                <button
                    className="btn custom-btn"
                    onClick={() => toggleMenu('filters')}
                >
                    <i className="bi bi-search me-2" />
                    <i className="bi bi-filter me-2" />
                    <i className={`bi bi-${visibleMenu === 'filters' ? 'caret-up-fill' : 'caret-down-fill'}`} />
                </button>

                <button
                    className="btn custom-btn"
                    onClick={() => toggleMenu('sort')}
                >
                    <i className="bi bi-funnel me-2" />
                    <i className={`bi bi-${visibleMenu === 'sort' ? 'caret-up-fill' : 'caret-down-fill'}`} />
                </button>
            </div>

            <div className="d-flex justify-content-center mt-5">
                {visibleMenu === 'filters' && (
                    <div className="filters-container visible">
                        <FiltersMenu
                            items={items}
                            onChange={handleFilterChange}
                        />
                    </div>
                )}

                {visibleMenu === 'sort' && (
                    <div className="sort-container visible">
                        <SortButtons
                            items={filteredItems}
                            onChange={handleSortChange}
                            fields={sortFields}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default AdminProductsHeader;