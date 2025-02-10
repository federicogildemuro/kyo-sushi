import useCart from '../../hooks/useCart';
import useAsync from '../../hooks/useAsync';
import CartDetail from './CartDetail';
import EmptyCart from './EmptyCart';
import BackButton from '../../components/misc/BackButton';
import Spinner from '../../components/spinner/Spinner';

function Cart() {
    const {
        cart,
        removeCartItem,
        clearCartItems,
        cartTotalAmount,
        loading: loadingCart
    } = useCart();

    const { loading: loadingRemove, execute: removeItem } = useAsync(removeCartItem, [], false);
    const { loading: loadingClear, execute: clearCart } = useAsync(clearCartItems, [], false);
    const loading = loadingRemove || loadingClear;

    if (loadingCart) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <h1 className="display-6 fw-bold mb-5">Tu carrito</h1>

                {loading ? (
                    <Spinner />
                ) : cart.length > 0 ? (
                    <CartDetail
                        cart={cart}
                        onRemoveFromCart={removeItem}
                        totalAmount={cartTotalAmount}
                        onClearCart={clearCart}
                    />
                ) : (
                    <EmptyCart />
                )}

                <BackButton />
            </div>
        </section>
    );
}

export default Cart;