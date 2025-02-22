import { useEffect, useMemo, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAsync from '../../hooks/useAsync';
import usePagination from '../../hooks/usePagination';
import { fetchOrdersByUser } from '../../services/ordersServices';
import Spinner from '../../components/spinner/Spinner';
import OrdersNotFound from './OrdersNotFound';
import OrdersHeader from './OrdersHeader';
import OrdersContent from './OrdersContent';
import BackButton from '../../components/misc/BackButton';

function Orders() {
    // Get the current user from the useAuth hook
    const { user } = useAuth();

    // Fetch orders by user when user is available
    const { data, loading } = useAsync(() => {
        if (user?.uid) {
            return fetchOrdersByUser(user.uid);
        }
    }, [user?.uid]);

    // Memoize orders when data changes
    const orders = useMemo(() => {
        return Array.isArray(data) ? data : [];
    }, [data]);

    // Handle sorting
    const [sortedOrders, setSortedOrders] = useState([]);
    useEffect(() => {
        if (orders.length > 0) {
            setSortedOrders(orders);
        }
    }, [orders]);
    const handleSortChange = (sorted) => {
        setSortedOrders(sorted);
    };

    // Set items per page
    const itemsPerPage = 10;
    // Paginate orders
    const { currentItems, currentPage, totalPages, setCurrentPage } = usePagination(sortedOrders, itemsPerPage);

    // Check if there are orders
    const hasOrders = sortedOrders.length > 0;
    // Render OrdersNotFound component if there are no orders
    if (!hasOrders) return <OrdersNotFound />;

    // Show spinner while orders are loading
    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <h1 className="display-6 fw-bold mb-5">Tus pedidos</h1>

                <OrdersHeader
                    orders={orders}
                    handleSortChange={handleSortChange}
                />

                <OrdersContent
                    orders={currentItems}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <BackButton />
            </div>
        </section>
    );
}

export default Orders;