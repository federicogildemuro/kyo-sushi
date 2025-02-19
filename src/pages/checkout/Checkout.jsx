import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAsync from '../../hooks/useAsync';
import useCart from '../../hooks/useCart';
import useNotification from '../../hooks/useNotification';
import { fetchUserById } from '../../services/userServices';
import { checkProductStockAndUpdate } from '../../services/productsServices';
import { createOrder } from '../../services/ordersServices';
import { sendOrderEmail } from '../../services/mailingServices';
import { scrollToTop } from '../../utils/scrollUtils';
import Spinner from '../../components/spinner/Spinner';
import OrderSummary from './OrderSummary';
import EmptyCart from '../cart/EmptyCart';
import BackButton from '../../components/misc/BackButton';

function Checkout() {
    /* Get user from useAuth hook */
    const { user } = useAuth();

    /* Fetch user by id when user is available */
    const { data: userData, loading: userLoading } = useAsync(() => {
        if (user?.uid) return fetchUserById(user.uid);
    }, [user?.uid]);

    /* Get cart data from useCart hook */
    const { cart, cartTotalAmount, clearCartItems, loading: cartLoading } = useCart();

    /* Check stock, create order and send email */
    const { loading: checkStockLoading, error: checkStockError, execute: checkStock } = useAsync(checkProductStockAndUpdate, [cart], false);
    const { loading: createOrderLoading, error: createOrderError, execute: createNewOrder } = useAsync(createOrder, [], false);
    const { loading: sendEmailLoading, error: sendEmailError, execute: sendEmail } = useAsync(sendOrderEmail, [], false);

    /* Get showNotification function from useNotification hook */
    const { showNotification } = useNotification();

    /* Consolidate errors */
    const error = checkStockError || createOrderError || sendEmailError;
    /* Show error notification if there is an error */
    useEffect(() => {
        if (error) showNotification(error.message, 'danger');
    }, [error, showNotification]);

    /* Get navigate function from useNavigate hook */
    const navigate = useNavigate();

    /* Handle confirm button click */
    const handleConfirm = async () => {
        const stockResult = await checkStock(cart);

        if (stockResult?.success) {
            const order = await createNewOrder({ user: userData, cart, total: cartTotalAmount });

            if (order) {
                showNotification('Compra realizada exitosamente', 'success');
                await sendEmail(order);
                clearCartItems();
                navigate(`/order-confirmation/${order?.orderId}`);
            }
        } else {
            const outOfStockItems = stockResult?.outOfStockProducts || [];
            const productNames = outOfStockItems.map((item) => item.title).join(', ');
            showNotification(`No hay stock suficiente de ${productNames}.`, 'warning');
        }

        scrollToTop();
    };

    /* Check if there are items in the cart */
    const hasItems = cart.length > 0;

    /* Consolidate loading states */
    const loading = userLoading || cartLoading || checkStockLoading || createOrderLoading || sendEmailLoading;
    /* Render spinner while loading */
    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <h1 className="display-6 fw-bold">Finalizar compra</h1>

                {hasItems ? (
                    <OrderSummary
                        user={userData}
                        cart={cart}
                        total={cartTotalAmount}
                        onConfirm={handleConfirm}
                    />
                ) : (
                    <EmptyCart />
                )}

                <BackButton />
            </div>
        </section>
    );
}

export default Checkout;