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
    const { filteredData, setFilter } = useDataFilter(data, ['title', 'category']);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 576) {
                setItemsPerPage(3);
            } else if (window.innerWidth < 992) {
                setItemsPerPage(6);
            } else {
                setItemsPerPage(8);
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

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);

    return (
        <section className="custom-container d-flex flex-column text-center">
            <h1 className="display-6 fw-bold mb-3">
                {category
                    ? `${category}`
                    : 'Nuestros productos'
                }
            </h1>

            <SearchBar
                onSearch={setFilter}
                placeholder="Buscar productos por título o categoría..."
            />

            {loading && <Spinner />}

            {!loading && (
                Array.isArray(currentItems) && currentItems.length > 0 ? (
                    <>
                        <ItemList items={currentItems} />

                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <p className="fs-5 fs-sm-6 fs-md-7 fs-lg-8 mt-3 mb-3">No se encontraron productos</p>
                )
            )}
        </section>
    );
}

export default ItemListContainer;