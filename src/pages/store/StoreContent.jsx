import ItemList from '../../components/item-list/ItemList';
import Pagination from '../../components/pagination/Pagination';
import ProductsNotFound from './ProductsNotFound';

function StoreContent({ products, totalPages, currentPage, setCurrentPage }) {
    /* Check if there are products to display in the table */
    const hasProducts = products.length > 0;
    /* Render ItemsNotFound component if there are no products */
    if (!hasProducts) return <ProductsNotFound />;

    return (
        <>
            <ItemList items={products} />

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </>
    );
}

export default StoreContent;