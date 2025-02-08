import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkProductStockAndUpdate } from "../../../services/productsServices";
import { createOrder } from "../../../services/ordersServices";
import { sendOrderEmail } from "../../../services/mailingServices";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import useAsync from "../../../hooks/useAsync";
import useNotification from "../../../hooks/useNotification";
import { createOrderAdapter } from "../../../adapters/orderAdapters";
import OrderSummary from "./OrderSummary";
import EmptyCart from "../cart/EmptyCart";
import BackButton from "../../../components/BackButton";
import Spinner from "../../../components/Spinner";

function Checkout() {
    const { user, loading: loadingUser } = useAuth();
    const userData = user?.userData || {};

    const {
        cart,
        cartTotalAmount,
        clearCartItems,
        loading: isCartLoading
    } = useCart();

    const {
        loading: isCheckingStock,
        error: stockCheckError,
        execute: handleStockCheckAndUpdate
    } = useAsync(checkProductStockAndUpdate, [cart], false);

    const {
        loading: isCreatingOrder,
        error: orderError,
        execute: handleCreateOrder
    } = useAsync(createOrder, [], false);

    const {
        loading: isSendingEmail,
        error: emailError,
        execute: handleSendOrderEmail
    } = useAsync(sendOrderEmail, [], false);

    const loading = loadingUser || isCartLoading || isCheckingStock || isCreatingOrder || isSendingEmail;
    const error = stockCheckError || orderError || emailError;

    const { showNotification } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            showNotification(error.message, 'danger');
        }
    }, [error, showNotification]);

    const handleConfirm = async () => {
        const stockResult = await handleStockCheckAndUpdate(cart);

        if (stockResult?.success) {
            clearCartItems();
            const adaptedOrder = createOrderAdapter(userData, cart, cartTotalAmount);
            const order = await handleCreateOrder(adaptedOrder);
            showNotification('Compra realizada exitosamente', 'success');
            handleSendOrderEmail(order);
            navigate(`/order-confirmation/${order?.id}`);
        } else {
            const productsWithNoStock = stockResult?.productsWithNoStock || [];
            const productsNames = productsWithNoStock.map(item => item.title).join(', ');
            showNotification(`No hay stock suficiente de ${productsNames}.`, 'warning');
        }
    };

    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <h1 className="display-6 fw-bold mb-5">Finalizar compra</h1>

                {cart.length > 0
                    ? <OrderSummary
                        user={userData}
                        cart={cart}
                        total={cartTotalAmount}
                        onConfirm={handleConfirm}
                    />
                    : <EmptyCart />
                }

                <BackButton />
            </div>
        </section>
    );
};

export default Checkout;