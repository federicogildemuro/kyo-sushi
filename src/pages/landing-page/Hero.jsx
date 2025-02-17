import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scrollToTop } from '../../utils/scrollUtils';

function Hero() {
    return (
        <section className="hero d-flex align-items-center justify-content-center text-center">
            <motion.div
                className="bg-dark bg-opacity-50 rounded p-4"
                initial={{ opacity: 0, scale: .5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <motion.h1
                    className="display-6 fw-bold mb-5"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', type: 'spring', stiffness: 100, delay: .5 }}
                >
                    ¡Bienvenido a Kyo Sushi!
                </motion.h1>

                <motion.p
                    className="lead mb-5"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', type: 'spring', stiffness: 100, delay: .75 }}
                >
                    Descubre los sabores más frescos y auténticos, listos para tu deleite.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', type: 'spring', stiffness: 100, delay: 1 }}
                >
                    <Link
                        to="/tienda"
                        className="btn btn-lg custom-btn"
                        onClick={scrollToTop}
                    >
                        Ir a la tienda
                        <i className="bi bi-arrow-right ms-2" />
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default Hero;