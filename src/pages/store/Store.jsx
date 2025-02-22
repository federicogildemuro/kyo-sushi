import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAsync from '../../hooks/useAsync';
import useItemsPerPage from '../../hooks/useItemsPerPage';
import usePagination from '../../hooks/usePagination';
import { fetchProducts } from '../../services/productsServices';
import StoreHeader from './StoreHeader';
import StoreContent from './StoreContent';
import Spinner from '../../components/spinner/Spinner';

function Store() {
    // Get the category from the URL params
    const { category } = useParams();
    // Fetch products on mount and whenever the category changes
    const { data, loading } = useAsync(() => fetchProducts(category), [category]);
    // Memoize the product list, ensuring it is always an array
    const products = useMemo(() => Array.isArray(data) ? data : [], [data]);
    // Update filtered and sorted products whenever the product list changes
    useEffect(() => {
        if (products.length > 0) {
            setFilteredProducts(products);
            setSortedProducts(products);
        }
    }, [products]);

    // Handle products filtering
    const [filteredProducts, setFilteredProducts] = useState([]);
    const handleFilterChange = (filtered) => {
        setFilteredProducts(filtered);
        setSortedProducts(filtered);
    };

    // Handle products sorting
    const [sortedProducts, setSortedProducts] = useState([]);
    const handleSortChange = (sorted) => {
        setSortedProducts(sorted);
    };

    // Get items per page according to the screen size using a custom hook
    const { itemsPerPage: productsPerPage } = useItemsPerPage();
    // Paginate sorted products
    const { currentItems: currentProducts, currentPage, totalPages, setCurrentPage } = usePagination(sortedProducts, productsPerPage);

    // Show spinner while fetching products
    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <StoreHeader
                category={category}
                products={products}
                filteredProducts={filteredProducts}
                handleFilterChange={handleFilterChange}
                handleSortChange={handleSortChange}
            />

            <StoreContent
                products={currentProducts}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </section>
    );
}

export default Store;