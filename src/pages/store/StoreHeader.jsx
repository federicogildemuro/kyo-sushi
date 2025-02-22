import { useState } from 'react';
import { Link } from 'react-router-dom';
import SortButtons from '../../components/misc/SortButtons';
import ProductsFilterMenu from '../../components/products-filters-menu/ProductsFiltersMenu';

function StoreHeader({ category, products, filteredProducts, handleFilterChange, handleSortChange }) {
    // Handle menu visibility
    const [visibleMenu, setVisibleMenu] = useState(null);
    const toggleMenu = (menu) => {
        setVisibleMenu(prevMenu => (prevMenu === menu ? null : menu));
    };

    // Define the available sorting fields for products
    const sortFields = [
        { name: 'Nombre', key: 'title' },
        { name: 'Precio', key: 'price' }
    ];

    return (
        <>
            {/* Show category and show all button if category is defined; otherwise, show filters and sort buttons */}
            {category ? (
                <div className="d-flex flex-column align-items-center gap-3 mb-5">
                    <h1 className="display-6 fw-bold">{category}</h1>

                    <Link
                        to="/tienda"
                        className="btn custom-btn"
                    >
                        Ver todos
                        <i
                            className="bi bi-grid ms-2"
                            aria-hidden="true"
                        />
                    </Link>
                </div>
            ) : (
                <>
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
            )}
        </>
    );
}

export default StoreHeader;