import { useState } from 'react';
import { Link } from 'react-router-dom';
import SortButtons from '../../components/misc/SortButtons';
import FiltersMenu from '../../components/filters-menu/FiltersMenu';

function StoreHeader({ category, items, filteredItems, handleFilterChange, handleSortChange }) {
    const [visibleMenu, setVisibleMenu] = useState(null);

    const toggleMenu = (menu) => {
        setVisibleMenu(prevMenu => (prevMenu === menu ? null : menu));
    };

    const sortFields = [
        { name: 'Nombre', key: 'title' },
        { name: 'Precio', key: 'price' }
    ];

    return (
        <>
            {category ? (
                <div className="d-flex flex-column align-items-center gap-3 mb-5">
                    <h1 className="display-6 fw-bold">{category}</h1>

                    <Link to="/tienda" className="btn custom-btn">
                        Ver todos
                        <i className="bi bi-grid ms-2" />
                    </Link>
                </div>
            ) : (
                <>
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
            )}
        </>
    );
}

export default StoreHeader;