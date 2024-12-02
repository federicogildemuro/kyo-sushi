import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

function Checkout() {
    const { cart } = useCart();

    console.log(cart);

    if (cart.length === 0) {
        return (
            <div>
                <h2>Añade productos al carrito para continuar con la compra</h2>
                <Link to="/tienda" className="btn btn-primary">Ir a la tienda</Link>
            </div>
        );
    }

    return (
        <>
            <h1>Ingrese sus datos para completar su compra</h1>
            <h4>Envíos únicamente a Palma de Mallorca</h4>
            <CheckoutForm />
        </>
    );
}

export default Checkout;