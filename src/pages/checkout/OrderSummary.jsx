function OrderSummary({ user, cart, total, onConfirm }) {
    const firstName = user?.firstName || "";
    const lastName = user?.lastName || "";
    const address = user?.address || {};

    return (
        <>
            <h2 className="mb-3">Datos de envío</h2>
            <p className="lead">Nombre: {`${firstName} ${lastName}`}</p>
            <p className="lead">
                Dirección: {`
                    ${address.street}
                    ${address.number}
                    ${address.apartment ? ` ${address.apartment}` : ''} -
                    ${address.city} (${address.state}, ${address.country})
                `}
            </p>

            <h2 className="mb-3">Detalle del pedido</h2>
            <ul className="d-flex flex-column align-items-center justify-content-center p-0">
                {cart.map((item) => (
                    <li key={item.id}>
                        {item.title} x {item.quantity} ${(item.price * item.quantity).toFixed(2)}
                    </li>
                ))}
            </ul>

            <h4 className="mb-3">Total: ${total.toFixed(2)}</h4>

            <button
                className="btn custom-btn my-3"
                onClick={onConfirm}
            >
                Confirmar compra
            </button>
        </>
    );
}

export default OrderSummary;