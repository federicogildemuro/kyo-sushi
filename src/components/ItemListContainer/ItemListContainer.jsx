import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAsync from '../../hooks/useAsync';
import useDataFilter from '../../hooks/useDataFilter';
import { fetchProducts } from '../../services/ProductsServices';
import Spinner from '../Spinner/Spinner';
import SearchBar from '../SearchBar/SearchBar';
import ItemList from '../ItemList/ItemList';
import Pagination from '../Pagination/Pagination';

function ItemListContainer() {
    const { category } = useParams();
    const { data, loading } = useAsync(() => fetchProducts(category), [category]);

    /* Search filter */
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

    /* Pagination */
    const [currentPage, setCurrentPage] = useState(1);
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Array.isArray(filteredData)
        ? filteredData.slice(indexOfFirstItem, indexOfLastItem)
        : [];

    const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="custom-container d-flex flex-column text-center">
            <SearchBar
                onSearch={(value) => setFilter({ search: value })}
                placeholder="Buscar productos por nombre..."
            />

            {loading && <Spinner />}

            {!loading &&
                (Array.isArray(currentItems) && currentItems.length > 0 ? (
                    <>
                        <ItemList items={currentItems} />

                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <p className="fs-5 mt-3 mb-3">No se encontraron productos</p>
                ))}
        </section>
    );
}

export default ItemListContainer;