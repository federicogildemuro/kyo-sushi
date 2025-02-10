import AdminProductsTable from './AdminProductsTable';
import Pagination from '../../../components/pagination/Pagination';
import ItemsNotFound from '../misc/ItemsNotFound';

function AdminProductsContent({ currentItems, totalPages, currentPage, setCurrentPage, onDeleteProduct }) {
    return (
        <>
            {currentItems.length > 0 ? (
                <>
                    <AdminProductsTable
                        products={currentItems}
                        onDeleteProduct={onDeleteProduct}
                    />

                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </>
            ) : (
                <ItemsNotFound />
            )}
        </>
    );
}

export default AdminProductsContent;