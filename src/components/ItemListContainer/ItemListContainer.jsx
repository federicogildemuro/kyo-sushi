import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAsync from '../../hooks/useAsync';
import { getProducts } from '../../services/ProductsServices';
import usePagination from '../../hooks/usePagination';
import FiltersMenu from '../FiltersMenu/FiltersMenu';
import SortButtons from '../SortButtons/SortButtons';
import Spinner from '../Spinner/Spinner';
import ItemList from '../ItemList/ItemList';
import Pagination from '../Pagination/Pagination';

function ItemListContainer() {
    /* Category from URL params */
    const { category } = useParams();

    /* Fetch products */
    const { data, loading, error } = useAsync(() => getProducts(category), [category]);
    const items = useMemo(() => Array.isArray(data) ? data : [], [data]);
    useEffect(() => {
        if (items.length > 0) {
            setFilteredItems(items);
            setSortedItems(items);
        }
    }, [items]);

    /* Filtering */
    const [filteredItems, setFilteredItems] = useState([]);
    const handleFilterChange = (filtered) => {
        setFilteredItems(filtered);
    };
    const [isFiltersMenuVisible, setFiltersMenuVisible] = useState(false);
    const toggleFiltersMenu = () => setFiltersMenuVisible(!isFiltersMenuVisible);

    /* Sorting */
    const [sortedItems, setSortedItems] = useState([]);
    const handleSortChange = (sorted) => {
        setSortedItems(sorted);
    };

    /* Responsive items per page */
    const [itemsPerPage, setItemsPerPage] = useState(4);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 576) {
                setItemsPerPage(4);
            } else if (window.innerWidth < 992) {
                setItemsPerPage(12);
            } else {
                setItemsPerPage(16);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /* Pagination */
    const { currentItems, currentPage, totalPages, setCurrentPage } = usePagination(sortedItems, itemsPerPage);

    return (
        <section className="custom-container d-flex flex-column text-center">
            <div className="d-flex flex-column m-5">
                <div className="d-flex justify-content-center justify-content-md-between gap-3 gap-md-0">
                    <button
                        className="btn custom-btn"
                        onClick={toggleFiltersMenu}
                    >
                        <i className="bi bi-filter"></i>
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
            </div>

            {loading && <Spinner />}

            {!loading && error && (
                <p className="fs-5">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Ocurrió un error al cargar los productos
                </p>
            )}

            {!loading && !error && (
                currentItems.length > 0 ? (
                    <>
                        <ItemList items={currentItems} />

                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    </>
                ) : (
                    <p className="fs-5">
                        <i className="bi bi-emoji-frown me-2"></i>
                        No se encontraron productos
                    </p>
                )
            )}
        </section>
    );
}

export default ItemListContainer;