import { Link } from 'react-router-dom';
import './CartItem.css';

function CartItem({ item, onRemoveFromCart }) {
    if (!item) return null;

    const { id, title, quantity, price } = item;

    return (
        <tr>
            <td className="text-start">{title}</td>

            <td className="text-center d-none d-sm-table-cell d-md-table-cell">{quantity}</td>

            <td className="text-end d-none d-sm-table-cell d-md-table-cell">${price.toFixed(2)}</td>

            <td className="text-end">${(price * quantity).toFixed(2)}</td>

            <td className="d-flex justify-content-end gap-2">
                <Link
                    to={`/item/${id}`}
                    className="btn custom-btn btn-sm"
                >
                    <i className="bi bi-eye" />
                </Link>

                <button
                    className="btn custom-btn btn-sm"
                    onClick={() => onRemoveFromCart(id)}
                >
                    <i className="bi bi-trash" />
                </button>
            </td>
        </tr>
    );
}

export default CartItem;