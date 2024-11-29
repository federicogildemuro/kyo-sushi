import useCart from '../../hooks/useCart';
import ItemCount from '../ItemCount/ItemCount';

function ItemDetail({ item }) {
    const { cart, addItem } = useCart();

    const onAddToCart = (quantity) => {
        addItem({ id: item.id, title: item.title, price: item.price, quantity });
        alert(`Agregaste ${quantity} productos al carrito`);
    };

    return (
        <div className="container mt-5">
            <div className="card h-100">
                <div className="row g-0 h-100">
                    <div className="col-md-4 position-relative">
                        <img
                            src={item.pictureUrl}
                            alt={item.title}
                            className="img-fluid rounded-start w-100 h-100 position-absolute"
                            style={{ top: 0, left: 0, bottom: 0, right: 0, objectFit: 'cover' }}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body d-flex flex-column h-100">
                            <h1 className="card-title">{item.title}</h1>
                            <p className="card-text">{item.description}</p>
                            <h3 className="card-text">€{item.price}</h3>
                            <p className="card-text">
                                {item.stock > 0
                                    ? (<small className="text-muted">{item.stock} unidades en stock</small>)
                                    : (<small className="text-danger">Producto no disponible</small>)
                                }
                            </p>
                            <div className="mt-auto">
                                <ItemCount stock={item.stock} onAddToCart={onAddToCart} />
                            </div>
                            <div className="d-flex justify-content-between mt-4">
                                <button
                                    className="btn btn-outline-secondary rounded px-4"
                                    onClick={() => window.history.back()}
                                >
                                    ← Volver
                                </button>

                                {cart && cart.length > 0 && (
                                    <button
                                        className="btn btn-primary rounded px-4"
                                        onClick={() => (window.location.href = '/cart')}
                                    >
                                        Comprar →
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;