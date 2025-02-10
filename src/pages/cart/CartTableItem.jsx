import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/scrollUtils';

function CartTableItem({ item, removeItem }) {
    const { id, title, quantity, price } = item;
    const totalPrice = (price * quantity).toFixed(2);

    if (!item) return null;

    return (
        <tr>
            <td className="text-start">{title}</td>

            <td className="text-end d-none d-sm-table-cell">{quantity}</td>

            <td className="text-end d-none d-sm-table-cell">${price.toFixed(2)}</td>

            <td className="text-end">${totalPrice}</td>

            <td>
                <div className="d-flex justify-content-end gap-2">
                    <Link
                        to={`/item/${id}`}
                        className="btn custom-btn btn-sm"
                        onClick={scrollToTop}
                    >
                        <i className="bi bi-eye" />
                    </Link>

                    <button
                        className="btn custom-btn btn-sm"
                        onClick={() => removeItem(id)}
                    >
                        <i className="bi bi-trash" />
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default CartTableItem;