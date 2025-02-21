import { Link } from "react-router-dom";

function CartItem({ item, removeItem }) {
    // Destructure and format item data
    const { id, title, quantity, price, pictureUrl } = item;
    const formattedPrice = price.toFixed(2);
    const formattedTotal = (price * quantity).toFixed(2);

    // Handle item removal
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
                        <Link
                            to={`/item/${id}`}
                            className="btn custom-btn"
                            aria-label={`Ver detalles de ${title}`}
                        >
                            <i
                                className="bi bi-eye"
                                aria-hidden="true"
                            />
                        </Link>

                        <button
                            className="btn btn-danger"
                            onClick={handleRemove}
                            aria-label={`Eliminar ${title} del carrito`}
                        >
                            <i
                                className="bi bi-trash"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default CartItem;