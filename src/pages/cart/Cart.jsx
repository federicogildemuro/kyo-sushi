import useCart from '../../hooks/useCart';
import CartContent from './CartContent';
import EmptyCart from './EmptyCart';
import BackButton from '../../components/misc/BackButton';
import Spinner from '../../components/spinner/Spinner';
import './Cart.css';

function Cart() {
    const { cart, loading, cartTotalAmount, removeCartItem, clearCartItems } = useCart();

    if (loading) return <Spinner />;

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <h1 className="display-6 fw-bold mb-5">Tu carrito</h1>

                {cart.length > 0 ? (
                    <CartContent
                        cart={cart}
                        total={cartTotalAmount}
                        removeItem={removeCartItem}
                        clearCart={clearCartItems}
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