import useCart from '../../hooks/useCart'
import useNotification from '../../hooks/useNotification'
import './CartItem.css'

function CartItem({ item }) {
    const { removeCartItem } = useCart();
    const { showNotification } = useNotification();

    const handleRemoveCartItem = () => {
        removeCartItem(item.id);
        showNotification('Producto eliminado del carrito', 'success');
    }

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
                    onClick={handleRemoveCartItem}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}

export default CartItem