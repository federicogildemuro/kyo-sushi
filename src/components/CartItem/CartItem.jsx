import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useNotification from '../../hooks/useNotification';
import './CartItem.css';

function CartItem({ item }) {
    const { removeCartItem } = useCart();
    const { showNotification } = useNotification();

    const handleRemoveCartItem = () => {
        removeCartItem(item.id);
        showNotification(`${item.title} eliminado del carrito exitosamente`, 'success');
    }

    if (!item) return null;

    return (
        <tr key={item.id}>
            <td className="text-start">{item.title}</td>

            <td className="text-center d-none d-sm-table-cell d-md-table-cell">{item.quantity}</td>

            <td className="text-end d-none d-sm-table-cell d-md-table-cell">${item.price.toFixed(2)}</td>

            <td className="text-end">${(item.price * item.quantity).toFixed(2)}</td>

            <td className="d-flex justify-content-end gap-2">
                <Link
                    to={`/item/${item.id}`}
                    className="btn custom-btn btn-sm"
                >
                    <i className="bi bi-eye" />
                </Link>

                <button
                    className="btn custom-btn btn-sm"
                    onClick={handleRemoveCartItem}
                >
                    <i className="bi bi-trash" />

                </button>
            </td>
        </tr>
    )
}

export default CartItem;