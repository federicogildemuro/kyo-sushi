import { Link } from "react-router-dom";

function CartItem({ item, removeItem }) {
    const { id, title, quantity, price, pictureUrl } = item;
    const formattedPrice = price.toFixed(2);
    const formattedTotal = (price * quantity).toFixed(2);

    const handleRemove = () => {
        removeItem(id);
    };

    return (
        <li className="cart-item-container p-3">
            <div className="d-flex align-items-center gap-3">
                <img
                    src={pictureUrl}
                    alt={`Imagen del producto ${title}`}
                    className="cart-item-image"
                />

                <div className="d-flex flex-grow-1 align-items-center justify-content-between">
                    <div className="d-flex  align-items-center justify-content-between w-100">
                        <p className="m-0 w-25">{title}</p>
                        <p className="d-none d-md-block m-0 w-25">x {quantity}</p>
                        <p className="d-none d-md-block m-0 w-25">Unidad: ${formattedPrice}</p>
                        <p className="d-none d-md-block m-0 w-25">Total: ${formattedTotal}</p>
                    </div>

                    <div className="d-flex gap-2">
                        <Link to={`/item/${id}`} className="btn custom-btn">
                            <i className="bi bi-eye" />
                        </Link>

                        <button className="btn btn-danger" onClick={handleRemove}>
                            <i className="bi bi-trash" />
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default CartItem;