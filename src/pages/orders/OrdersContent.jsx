import OrdersTable from './OrdersTable';
import Pagination from '../../components/pagination/Pagination';

function OrdersContent({ orders, totalPages, currentPage, setCurrentPage }) {
    return (
        <>
            <OrdersTable orders={orders} />

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </>
    );
}

export default OrdersContent;