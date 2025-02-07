import CartTable from './CartTable';
import CartActions from './CartActions';

function CartDetail({ cart, onRemoveFromCart, totalAmount, onClearCart }) {
    return (
        <>
            <CartTable
                cart={cart}
                removeFromCart={onRemoveFromCart}
            />

            <CartActions
                totalAmount={totalAmount}
                clearCart={onClearCart}
            />
        </>
    );
}

export default CartDetail;