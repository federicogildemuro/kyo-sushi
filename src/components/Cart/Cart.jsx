import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';

function Cart() {
    const { cart, removeItem, emptyCart, totalPrice } = useCart();

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Tu Carrito</h1>
            {cart.length === 0 ? (
                <div className="text-center">
                    <p>No hay ítems en tu carrito.</p>
                    <Link to="/" className="btn btn-primary">
                        Volver a la tienda
                    </Link>
                </div>
            ) : (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <h3>Total: ${totalPrice().toFixed(2)}</h3>
                        <div>
                            <button className="btn btn-secondary me-2" onClick={emptyCart}>
                                Vaciar Carrito
                            </button>
                            <button className="btn btn-success">Finalizar Compra</button>
                            <Link to="/tienda" className="btn btn-primary ms-2">
                                Seguir comprando
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;