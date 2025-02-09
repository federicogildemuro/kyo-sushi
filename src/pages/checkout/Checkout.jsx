import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkProductStockAndUpdate } from '../../services/productsServices';
import { createOrder } from '../../services/ordersServices';
import { sendOrderEmail } from '../../services/mailingServices';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useAsync from '../../hooks/useAsync';
import useNotification from '../../hooks/useNotification';
import { createOrderAdapter } from '../../adapters/orderAdapters';
import { scrollToTop } from '../../utils/scrollUtils';
import OrderSummary from './OrderSummary';
import EmptyCart from '../cart/EmptyCart';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

function Checkout() {
    const { user, loading: isUserLoading } = useAuth();
    const userData = user?.userData || {};

    const { cart, cartTotalAmount, clearCartItems, loading: isCartLoading } = useCart();
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    const { loading: isCheckingStock, error: stockError, execute: checkStock } = useAsync(checkProductStockAndUpdate, [cart], false);
    const { loading: isCreatingOrder, error: orderError, execute: createNewOrder } = useAsync(createOrder, [], false);
    const { loading: isSendingEmail, error: emailError, execute: sendEmail } = useAsync(sendOrderEmail, [], false);

    const loading = isUserLoading || isCartLoading || isCheckingStock || isCreatingOrder || isSendingEmail;
    const error = stockError || orderError || emailError;

    useEffect(() => {
        if (error) showNotification(error.message, "danger");
    }, [error, showNotification]);

    const handleConfirm = async () => {
        const stockResult = await checkStock(cart);

        if (stockResult?.success) {
            clearCartItems();

            const adaptedOrder = createOrderAdapter(userData, cart, cartTotalAmount);
            const order = await createNewOrder(adaptedOrder);

            showNotification("Compra realizada exitosamente", "success");
            sendEmail(order);
            navigate(`/order-confirmation/${order?.id}`);
        } else {
            const outOfStockItems = stockResult?.outOfStockProducts || [];
            const productNames = outOfStockItems.map((item) => item.title).join(", ");
            showNotification(`No hay stock suficiente de ${productNames}.`, "warning");
        }

        scrollToTop();
    };

    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <h1 className="display-6 fw-bold mb-5">Finalizar compra</h1>

                {cart.length > 0 ? (
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