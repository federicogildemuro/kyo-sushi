import ItemList from '../../components/item-list/ItemList';
import Pagination from '../../components/Pagination';
import ProductsNotFound from './ProductsNotFound';

function StoreContent({ currentItems, totalPages, currentPage, setCurrentPage }) {
    return (
        <>
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
                <ProductsNotFound />
            )}
        </>
    );
}

export default StoreContent;