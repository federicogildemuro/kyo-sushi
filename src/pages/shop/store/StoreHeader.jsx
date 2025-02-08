import { useState } from 'react';
import { Link } from 'react-router-dom';
import SortButtons from '../../../components/SortButtons';
import FiltersMenu from '../../../components/FiltersMenu';

function StoreHeader({ category, items, filteredItems, handleFilterChange, handleSortChange }) {
    const [isFiltersMenuVisible, setFiltersMenuVisible] = useState(false);
    const toggleFiltersMenu = () => setFiltersMenuVisible(!isFiltersMenuVisible);

    return (
        <>
            {category ? (
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <h1 className="display-6 fw-bold mb-5">{category}</h1>
                    <Link to="/tienda" className="btn custom-btn">
                        Ver todos
                        <i className="bi bi-grid ms-2" />
                    </Link>
                </div>
            ) : (
                <>
                    <div className="d-flex align-items-center justify-content-center justify-content-md-between gap-3 gap-md-0 mt-5 mx-5">
                        <button
                            className="btn custom-btn"
                            onClick={toggleFiltersMenu}
                        >
                            <i className="bi bi-filter" />
                        </button>

                        <SortButtons
                            items={filteredItems}
                            onChange={handleSortChange}
                            fields={[
                                { name: 'Nombre', key: 'title' },
                                { name: 'Precio', key: 'price' },
                            ]}
                        />
                    </div>

                    {isFiltersMenuVisible && (
                        <FiltersMenu
                            items={items}
                            onFilterChange={handleFilterChange}
                        />
                    )}
                </>
            )}
        </>
    );
}

export default StoreHeader;