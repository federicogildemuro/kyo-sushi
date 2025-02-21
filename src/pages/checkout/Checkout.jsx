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
    // Get user from the custom hook
    const { user } = useAuth();

    // Fetch user by id when user is available
    const { data: userData, loading: userLoading } = useAsync(() => {
        if (user?.uid) return fetchUserById(user.uid);
    }, [user?.uid]);

    // Get cart data from the custom hook
    const { cart, cartTotalAmount, clearCartItems, loading: cartLoading } = useCart();

    // Handle check stock, create order and send email
    const { loading: checkStockLoading, error: checkStockError, execute: checkStock } = useAsync(checkProductStockAndUpdate, [cart], false);
    const { loading: createOrderLoading, error: createOrderError, execute: createNewOrder } = useAsync(createOrder, [], false);
    const { loading: sendEmailLoading, error: sendEmailError, execute: sendEmail } = useAsync(sendOrderEmail, [], false);

    // Show notification on error
    const error = checkStockError || createOrderError || sendEmailError;
    const { showNotification } = useNotification();
    useEffect(() => {
        if (error) showNotification(error.message, 'danger');
    }, [error, showNotification]);


    // Handle order confirmation
    const navigate = useNavigate();
    const handleConfirm = async () => {
        // Check stock before creating the order
        const stockResult = await checkStock(cart);

        // If there is enough stock, create the order
        if (stockResult?.success) {
            const order = await createNewOrder({ user: userData, cart, total: cartTotalAmount });
            // If the order was created successfully, send the email, clear the cart and navigate to the order confirmation page
            // Otherwise, show a notification with the error message
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

    // Check if there are items in the cart
    const hasItems = cart.length > 0;

    // Show spinner while loading
    const loading = userLoading || cartLoading || checkStockLoading || createOrderLoading || sendEmailLoading;
    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <h1 className="display-6 fw-bold">Finalizar compra</h1>

                {/* Show order summary if there are items in the cart, otherwise render an empty cart message */}
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