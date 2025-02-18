function OrderSummary({ user, cart, total, onConfirm }) {
    const { firstName, lastName, address } = user;
    const formattedAddress = `${address.street} ${address.number} ${address.apartment ? ` ${address.apartment}` : ''} - ${address.city} (${address.state}, ${address.country})`;
    const formattedTotal = total.toFixed(2);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center mx-auto my-5">
            <div className="custom-border p-5">
                <h2 className="mb-3">Datos de envío</h2>
                <p className="lead">Nombre</p>
                <p>{`${firstName} ${lastName}`}</p>
                <p className="lead">Dirección</p>
                <p>{formattedAddress}</p>

                <h2 className="mb-3">Detalle del pedido</h2>
                <ul className="d-flex flex-column align-items-center justify-content-center p-0">
                    {cart.map((item) => (
                        <li key={item.id}>
                            {item.title} x {item.quantity} ${(item.price * item.quantity).toFixed(2)}
                        </li>
                    ))}
                </ul>
                <p className="lead mb-3">Total ${formattedTotal}</p>

                <button
                    className="btn custom-btn my-3"
                    onClick={onConfirm}
                >
                    Confirmar compra
                </button>
            </div>
        </div>
    );
}

export default OrderSummary;