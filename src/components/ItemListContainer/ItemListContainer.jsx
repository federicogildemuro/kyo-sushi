import { useParams } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import useAsync from '../../hooks/useAsync';
import { fetchProducts } from '../../services/ProductsServices';
import useDataFilter from '../../hooks/useDataFilter';
import usePagination from '../../hooks/usePagination';
import SearchBar from '../SearchBar/SearchBar';
import Spinner from '../Spinner/Spinner';
import ItemList from '../ItemList/ItemList';
import Pagination from '../Pagination/Pagination';

function ItemListContainer() {
    /* Category param */
    const { category } = useParams();

    /* Products fetch */
    const { data, loading, error } = useAsync(() => fetchProducts(category), [category]);

    /* Products filter */
    const { filteredData, setFilter } = useDataFilter(
        data,
        ['title'],
        (item, filter) => {
            const matchesSearch = filter.search
                ? item.title?.toLowerCase().includes(filter.search.toLowerCase())
                : true;
            return matchesSearch;
        }
    );

    /* Search bar */
    const handleSearch = useCallback((value) => {
        setFilter({ search: value });
    }, [setFilter]);

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
    const { currentItems, currentPage, totalPages, setCurrentPage } = usePagination(
        filteredData,
        itemsPerPage
    );

    return (
        <section className="custom-container d-flex flex-column text-center">
            <SearchBar
                onSearch={handleSearch}
                placeholder="Buscar productos por nombre..."
            />

            {loading && <Spinner />}

            {!loading && error && (
                <p className="fs-5">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error.message || 'Ocurrió un error al cargar los productos.'}
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