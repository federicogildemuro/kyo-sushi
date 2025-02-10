import { useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../../../services/productsServices';
import useAsync from '../../../hooks/useAsync';
import usePagination from '../../../hooks/usePagination';
import AdminProductsHeader from './AdminProductsHeader';
import AdminProductsContent from './AdminProductsContent';
import Spinner from '../../../components/spinner/Spinner';

function AdminProducts() {
    const { data, loading } = useAsync(() => fetchProducts());
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
        setSortedItems(filtered);
    };

    const [sortedItems, setSortedItems] = useState([]);
    const handleSortChange = (sorted) => {
        setSortedItems(sorted);
    };

    const itemsPerPage = 10;
    const { currentItems, currentPage, totalPages, setCurrentPage } = usePagination(sortedItems, itemsPerPage);

    const handleDeleteProduct = (productId) => {
        setFilteredItems((prevItems) => prevItems.filter(item => item.id !== productId));
        setSortedItems((prevItems) => prevItems.filter(item => item.id !== productId));
    };

    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <AdminProductsHeader
                items={items}
                filteredItems={filteredItems}
                handleFilterChange={handleFilterChange}
                handleSortChange={handleSortChange}
            />

            <AdminProductsContent
                currentItems={currentItems}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onDeleteProduct={handleDeleteProduct}
            />
        </section>
    );
}

export default AdminProducts;