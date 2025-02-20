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
                    <i className="bi bi-plus ms-2" />
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
                {/* Show selected menu, but not both at the same time */}
                {visibleMenu === 'filters' && (
                    <div className="filters-container visible">
                        <ProductsFilterMenu
                            products={products}
                            onChange={handleFilterChange}
                        />
                    </div>
                )}

                {visibleMenu === 'sort' && (
                    <div className="sort-container visible">
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