import useCart from "../../hooks/useCart";

function CartItem({ item }) {
    const { removeCartItem } = useCart();

    return (
        <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.quantity}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${(item.price * item.quantity).toFixed(2)}</td>
            <td>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeCartItem(item.id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

export default CartItem;