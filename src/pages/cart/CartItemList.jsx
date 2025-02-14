import CartItem from './CartItem';

function CartItemList({ cart, removeItem }) {
    return (
        <ul className="d-flex flex-column gap-3 p-0">
            {cart.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    removeItem={removeItem}
                />
            ))}
        </ul>
    );
}

export default CartItemList;