import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductsFilterMenu from '../../../components/products-filters-menu/ProductsFiltersMenu';
import SortButtons from '../../../components/misc/SortButtons';

function AdminProductsHeader({ products, filteredProducts, handleFilterChange, handleSortChange }) {
    /* Handle menu visibility toggle */
    const [visibleMenu, setVisibleMenu] = useState(null);
    const toggleMenu = (menu) => {
        setVisibleMenu(prevMenu => (prevMenu === menu ? null : menu));
    };

    /* Define the available sorting fields for products */
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
                    to="/admin/productos/nuevo"
                    className="btn custom-btn"
                >
                    Crear producto
                    <i
                        className="bi bi-plus ms-2"
                        aria-hidden="true"
                    />
                </Link>
            </div>

            <div className="d-flex gap-3 justify-content-center mt-5">
                <button
                    className="btn custom-btn"
                    onClick={() => toggleMenu('filters')}
                    aria-expanded={visibleMenu === 'filters'}
                    aria-controls="filters-container"
                >
                    <i
                        className="bi bi-search me-2"
                        aria-hidden="true"
                    />
                    <i
                        className="bi bi-filter me-2"
                        aria-hidden="true"
                    />
                    <i
                        className={`bi bi-${visibleMenu === 'filters' ? 'caret-up-fill' : 'caret-down-fill'}`}
                        aria-hidden="true"
                    />
                </button>

                <button
                    className="btn custom-btn"
                    onClick={() => toggleMenu('sort')}
                    aria-expanded={visibleMenu === 'sort'}
                    aria-controls="sort-container"
                >
                    <i
                        className="bi bi-funnel me-2"
                        aria-hidden="true"
                    />
                    <i
                        className={`bi bi-${visibleMenu === 'sort' ? 'caret-up-fill' : 'caret-down-fill'}`}
                        aria-hidden="true"
                    />
                </button>
            </div>

            <div className="d-flex justify-content-center mt-5">
                {/* Show selected menu, but not both at the same time */}
                {visibleMenu === 'filters' && (
                    <div
                        id="filters-container"
                        className="filters-container visible"
                    >
                        <ProductsFilterMenu
                            products={products}
                            onChange={handleFilterChange}
                        />
                    </div>
                )}

                {visibleMenu === 'sort' && (
                    <div
                        id="sort-container"
                        className="sort-container visible"
                    >
                        <SortButtons
                            items={filteredProducts}
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