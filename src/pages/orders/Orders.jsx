import { useEffect, useMemo, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { fetchOrdersByUser } from '../../services/ordersServices';
import useAsync from '../../hooks/useAsync';
import usePagination from '../../hooks/usePagination';
import Spinner from '../../components/spinner/Spinner';
import OrdersNotFound from './OrdersNotFound';
import OrdersHeader from './OrdersHeader';
import OrdersContent from './OrdersContent';
import BackButton from '../../components/misc/BackButton';

function Orders() {
    // Get user from the custom hook
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

    // Show spinner while orders are loading
    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <h1 className="display-6 fw-bold mb-5">Tus pedidos</h1>

                {/* Show orders if there are items, otherwise show an empty orders message */}
                {hasOrders ? (
                    <>
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
                    </>
                ) : (
                    <OrdersNotFound />
                )}

                <BackButton />
            </div>
        </section>
    );
}

export default Orders;