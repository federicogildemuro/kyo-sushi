import { Link } from 'react-router-dom'
import useCart from '../../hooks/useCart'
import CheckoutForm from '../CheckoutForm/CheckoutForm'

function Checkout() {
    const { cart } = useCart();

    return (
        <section className="custom-container d-flex flex-column text-center">
            <div className="container mb3">
                <h1 className="display-6 fw-bold mb-3">Ingrese sus datos para completar su compra</h1>

                <h3>Envíos únicamente a Palma de Mallorca</h3>

                {cart.length === 0
                    ?
                    <>
                        <p className="fs-5 fs-sm-6 fs-md-7 fs-lg-8 mt-3 mb-3">No hay ítems en tu carrito.</p>
                        <Link to="/tienda" className="btn custom-btn">Ir a la tienda</Link>
                    </>
                    : <CheckoutForm />
                }
            </div>
        </section>
    )
}

export default Checkout