import useCart from '../../hooks/useCart';
import CartContent from './CartContent';
import EmptyCart from './EmptyCart';
import BackButton from '../../components/misc/BackButton';
import Spinner from '../../components/spinner/Spinner';
import './Cart.css';

function Cart() {
    // Get the cart, loading state, total amount, and functions to remove and clear items from the custom hook
    const { cart, loading, cartTotalAmount, removeCartItem, clearCartItems } = useCart();

    // Check if there are items in the cart
    const hasItems = cart.length > 0;
    // Render EmptyCart component if there are no items
    if (!hasItems) return <EmptyCart />;

    // Show spinner while the cart is loading
    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <h1 className="display-6 fw-bold mb-5">Tu carrito</h1>

                <CartContent
                    cart={cart}
                    total={cartTotalAmount}
                    removeItem={removeCartItem}
                    clearCart={clearCartItems}
                />

                <BackButton />
            </div>
        </section>
    );
}

export default Cart;