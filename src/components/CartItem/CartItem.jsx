import useCart from '../../hooks/useCart'

function CartItem({ item }) {
    const { removeCartItem } = useCart();

    if (!item) return null;

    return (
        <tr key={item.id}>
            <td className="text-start">{item.title}</td>
            <td className="text-center d-none d-sm-table-cell d-md-table-cell">{item.quantity}</td>
            <td className="text-end d-none d-sm-table-cell d-md-table-cell">${item.price.toFixed(2)}</td>
            <td className="text-end">${(item.price * item.quantity).toFixed(2)}</td>
            <td className="text-end">
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeCartItem(item.id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}

export default CartItem