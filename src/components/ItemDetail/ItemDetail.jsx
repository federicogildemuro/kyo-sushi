import { Link } from 'react-router-dom'
import useCart from '../../hooks/useCart'
import ItemCount from '../ItemCount/ItemCount'
import './ItemDetail.css'

function ItemDetail({ item }) {
    const { isInCart, addCartItem } = useCart();

    const onAddToCart = (quantity) => {
        addCartItem({ ...item, quantity });
    }

    if (!item) return null;

    return (
        <div className="container mt-5 mb-5">
            <div className="card custom-card">
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
                            <h1 className="card-title display-6 fw-bold">{item.title}</h1>

                            <p className="card-text">{item.description}</p>

                            <h3 className="card-text text-start">€{item.price.toFixed(2)}</h3>

                            <p className="card-text text-start">
                                {item.stock > 0
                                    ? (<small className="text-muted">{item.stock} unidades en stock</small>)
                                    : (<small className="text-danger">Producto no disponible</small>)
                                }
                                {isInCart(item.id) && (
                                    <small className="text-success ms-2">Producto en el carrito</small>
                                )
                                }
                            </p>

                            <div className="d-flex flex-column flex-lg-row align-items-center justify-content-lg-between mt-3 mb-3">
                                <ItemCount stock={item.stock} onAddToCart={onAddToCart} />

                                <Link to="/cart" className="btn custom-btn mb-3 mb-lg-0 order-lg-3">
                                    Ir al carrito
                                </Link>

                                <button
                                    className="btn custom-btn mb-3 mb-lg-0 order-lg-1"
                                    onClick={() => window.history.back()}
                                >
                                    Volver a la tienda
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail