import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { scrollToTop } from '../../utils/scrollUtils';

function OrderConfirmation() {
    const orderId = useParams().orderId;

    useEffect(() => {
        AOS.init({
            duration: 3000,
            once: true,
        });
    }, []);

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <h1
                    className="display-6 fw-bold mb-5"
                    data-aos="zoom-in"
                >
                    <i className="bi bi-check-circle me-2" />
                    Pedido confirmado
                </h1>

                <p className="lead">
                    <i className="bi bi-cart-fill me-2" />
                    Se ha registrado con el número {orderId}
                </p>

                <p className="lead">
                    <i className="bi bi-envelope-check me-2" />
                    Le hemos enviado un correo electrónico con los detalles del mismo
                </p>

                <p className="lead">
                    <i className="bi bi-clock me-2" />
                    Si tiene alguna consulta, no dude en contactarnos
                </p>

                <p className="lead">
                    <i className="bi bi-heart me-2" />
                    ¡Gracias por elegirnos!
                </p>

                <p className="lead">
                    <i className="bi bi-star-fill me-2" />
                    Lo esperamos nuevamente en nuestra tienda
                </p>

                <Link
                    to="/tienda"
                    className="btn custom-btn my-3"
                    onClick={scrollToTop}
                >
                    Ir a la tienda
                    <i className="bi bi-shop ms-2" />
                </Link>
            </div>
        </section>
    );
};

export default OrderConfirmation;