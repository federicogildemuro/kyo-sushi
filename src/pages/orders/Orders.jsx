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
    /* Get user from useAuth hook */
    const { user } = useAuth();

    /* Fetch orders by user when user is available */
    const { data, loading } = useAsync(() => {
        if (user?.uid) {
            return fetchOrdersByUser(user.uid);
        }
    }, [user?.uid]);

    /* Memoize orders when data changes */
    const orders = useMemo(() => {
        return Array.isArray(data) ? data : [];
    }, [data]);

    /* Sorting */
    const [sortedOrders, setSortedOrders] = useState([]);

    useEffect(() => {
        if (orders.length > 0) {
            setSortedOrders(orders);
        }
    }, [orders]);

    const handleSortChange = (sorted) => {
        setSortedOrders(sorted);
    };

    /* Pagination */
    const itemsPerPage = 10;
    const { currentItems, currentPage, totalPages, setCurrentPage } = usePagination(sortedOrders, itemsPerPage);

    /* Check if user has orders */
    const hasOrders = sortedOrders.length > 0;

    /* Render spinner while fetching orders */
    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <h1 className="display-6 fw-bold mb-5">Tus pedidos</h1>

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