import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { scrollToTop } from '../../../utils/scrollUtils';

function OrderConfirmation() {
    const orderId = useParams().orderId;

    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: true,
        });
    }, []);

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <h1
                    className="display-6 fw-bold mb-5"
                    data-aos="fade-down"
                >
                    Gracias por su compra!!!
                </h1>

                <p className="lead">Su pedido ha sido registrado con el número {orderId}</p>
                <p className="lead">Le hemos enviado un correo electrónico con los detalles del mismo</p>
                <p className="lead">Si tiene alguna consulta, no dude en contactarnos</p>
                <p className="lead">¡Gracias por elegirnos!</p>
                <p className="lead">Lo esperamos nuevamente en nuestra tienda</p>

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