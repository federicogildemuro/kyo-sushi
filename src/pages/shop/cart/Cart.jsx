import useCart from '../../../hooks/useCart';
import useAsync from '../../../hooks/useAsync';
import CartDetail from './CartDetail';
import EmptyCart from './EmptyCart';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/Spinner';
import './Cart.css';

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

    const isLoading = loadingCart || loadingRemove || loadingClear;
    const hasItems = cart.length > 0;

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <h1 className="display-6 fw-bold mb-5">Tu carrito</h1>

                {isLoading ? (
                    <Spinner />
                ) : hasItems ? (
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