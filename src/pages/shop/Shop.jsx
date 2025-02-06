import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../services/productsServices';
import useAsync from '../../hooks/useAsync';
import usePagination from '../../hooks/usePagination';
import FiltersMenu from '../../components/FiltersMenu';
import SortButtons from '../../components/SortButtons';
import ItemList from '../../components/item-list/ItemList';
import Pagination from '../../components/Pagination';
import Spinner from '../../components/Spinner';

function Shop() {
    const { category } = useParams();

    const { data, loading } = useAsync(() => fetchProducts(category), [category]);

    const items = useMemo(() => Array.isArray(data) ? data : [], [data]);

    useEffect(() => {
        if (items.length > 0) {
            setFilteredItems(items);
            setSortedItems(items);
        }
    }, [items]);

    const [filteredItems, setFilteredItems] = useState([]);

    const handleFilterChange = (filtered) => {
        setFilteredItems(filtered);
    };

    const [isFiltersMenuVisible, setFiltersMenuVisible] = useState(false);

    const toggleFiltersMenu = () => setFiltersMenuVisible(!isFiltersMenuVisible);

    const [sortedItems, setSortedItems] = useState([]);

    const handleSortChange = (sorted) => {
        setSortedItems(sorted);
    };

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

    const { currentItems, currentPage, totalPages, setCurrentPage } = usePagination(sortedItems, itemsPerPage);

    return (
        <section className="d-flex flex-column text-center">
        {loading && <Spinner />}

            <div className="d-flex flex-column m-5">
                <div className="d-flex justify-content-center justify-content-md-between gap-3 gap-md-0">
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
            </div>

            {currentItems.length > 0 ? (
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
                        <i className="bi bi-emoji-frown me-2" />
                        No hay productos para mostrar
                    </p>
                )
            }
        </section>
    );
}

export default Shop;