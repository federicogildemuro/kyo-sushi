import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scrollToTop } from '../../utils/scrollUtils';

function OrderConfirmation() {
    const orderId = useParams().orderId;
    const confirmationMessages = [
        { icon: "bi bi-cart-fill", text: `Se ha registrado con el número ${orderId}` },
        { icon: "bi bi-envelope-check", text: "Le hemos enviado un correo electrónico con los detalles del mismo" },
        { icon: "bi bi-clock", text: "Si tiene alguna consulta, no dude en contactarnos" },
        { icon: "bi bi-heart", text: "¡Gracias por elegirnos!" },
        { icon: "bi bi-star-fill", text: "Lo esperamos nuevamente en nuestra tienda" }
    ];

    return (
        <section className="d-flex flex-column text-center">
            <div className="container">
                <motion.h1
                    className="display-6 fw-bold mb-5"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <i className="bi bi-check-circle me-2" />
                    Pedido confirmado
                </motion.h1>

                {confirmationMessages.map((item, index) => (
                    <motion.p
                        key={index}
                        className="lead"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .5, delay: index * 0.25 }}
                    >
                        <i className={`${item.icon} me-2`} />
                        {item.text}
                    </motion.p>
                ))}

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .5, delay: 1.25 }}
                >
                    <Link
                        to="/tienda"
                        className="btn custom-btn my-3"
                        onClick={scrollToTop}
                    >
                        Ir a la tienda
                        <i className="bi bi-shop ms-2" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

export default OrderConfirmation;