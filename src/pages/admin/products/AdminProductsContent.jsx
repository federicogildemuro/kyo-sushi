import AdminProductsTable from './AdminProductsTable';
import Pagination from '../../../components/pagination/Pagination';
import ItemsNotFound from '../misc/ItemsNotFound';

function AdminProductsContent({ products, totalPages, currentPage, setCurrentPage, onDeleteProduct }) {
    /* Check if there are products to display in the table */
    const hasProducts = products.length > 0;
    /* Render ItemsNotFound component if there are no products */
    if (!hasProducts) return <ItemsNotFound />;

    return (
        <>
            <AdminProductsTable
                products={products}
                onDeleteProduct={onDeleteProduct}
            />

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </>
    );
}

export default AdminProductsContent;