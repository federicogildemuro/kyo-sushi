import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../../services/productsServices';
import useAsync from '../../../hooks/useAsync';
import useItemsPerPage from '../../../hooks/useItemsPerPage';
import usePagination from '../../../hooks/usePagination';
import StoreHeader from './StoreHeader';
import StoreContent from './StoreContent';
import Spinner from '../../../components/Spinner';

function Store() {
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

    const [sortedItems, setSortedItems] = useState([]);
    const handleSortChange = (sorted) => {
        setSortedItems(sorted);
    };

    const { itemsPerPage } = useItemsPerPage();
    const { currentItems, currentPage, totalPages, setCurrentPage } = usePagination(sortedItems, itemsPerPage);

    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <StoreHeader
                category={category}
                items={items}
                filteredItems={filteredItems}
                handleFilterChange={handleFilterChange}
                handleSortChange={handleSortChange}
            />

            <StoreContent
                currentItems={currentItems}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </section>
    );
}

export default Store;