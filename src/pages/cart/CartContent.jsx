import CartItemList from './CartItemList';
import CartSummary from './CartSummary';
import CartActions from './CartActions';

function CartContent({ cart, total, removeItem, clearCart }) {
    return (
        <div className="d-flex flex-column gap-5">
            <CartItemList
                cart={cart}
                removeItem={removeItem}
            />

            <CartSummary total={total} />

            <CartActions clearCart={clearCart} />
        </div>
    );
}

export default CartContent;