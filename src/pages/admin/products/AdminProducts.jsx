import { useEffect, useMemo, useState } from 'react';
import useAsync from '../../../hooks/useAsync';
import usePagination from '../../../hooks/usePagination';
import useNotification from '../../../hooks/useNotification';
import { fetchProducts, deleteProduct } from '../../../services/productsServices';
import AdminProductsHeader from './AdminProductsHeader';
import AdminProductsContent from './AdminProductsContent';
import Spinner from '../../../components/spinner/Spinner';

function AdminProducts() {
    // State to trigger product list refresh
    const [refreshKey, setRefreshKey] = useState(0);
    // Fetch products on mount and whenever the refresh key changes
    const { data, loading: fetching, error: errorFetching } = useAsync(fetchProducts, [refreshKey]);
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

    // Set items per page
    const productsPerPage = 10;
    // Paginate sorted products
    const { currentItems: currentProducts, currentPage, totalPages, setCurrentPage } = usePagination(sortedProducts, productsPerPage);

    // Handle product deletion
    const { data: result, loading: deleting, error: errorDeleting, execute: deleteProductById } = useAsync(deleteProduct, [], false);
    const handleDeleteProduct = (productId) => {
        deleteProductById(productId);
    };

    // Show notifications on success or error
    const { showNotification } = useNotification();
    const error = errorFetching || errorDeleting || null;
    useEffect(() => {
        if (result) {
            showNotification('Producto eliminado existosamente', 'success');
            setRefreshKey((prevKey) => prevKey + 1);
        }
        if (error) showNotification(error.message, 'danger');
    }, [result, error, showNotification]);

    // Show spinner while fetching products
    if (fetching) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            {/* Show spinner while deleting product */}
            {deleting && <Spinner />}

            <AdminProductsHeader
                products={products}
                filteredProducts={filteredProducts}
                handleFilterChange={handleFilterChange}
                handleSortChange={handleSortChange}
            />

            <AdminProductsContent
                products={currentProducts}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onDeleteProduct={handleDeleteProduct}
            />
        </section>
    );
}

export default AdminProducts;