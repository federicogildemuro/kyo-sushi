import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { scrollToTop } from '../../utils/ScrollUtils';

function Hero() {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: true,
        });
    }, []);

    return (
        <section className="hero d-flex justify-content-center align-items-center text-center">
            <div
                className="bg-dark bg-opacity-50 p-4 rounded shadow-lg"
                data-aos="zoom-in"
            >
                <h1
                    className="display-4 mb-5"
                    data-aos="fade-down"
                >
                    ¡Bienvenido a Kyo Sushi!
                </h1>

                <p
                    className="lead mb-5"
                    data-aos="fade-up"
                >
                    Descubre los sabores más frescos y auténticos, listos para tu deleite.
                </p>

                <Link
                    to="/tienda"
                    className="btn btn-lg custom-btn"
                    onClick={scrollToTop}
                >
                    Ir a la tienda
                    <i className="bi bi-shop ms-2" />
                </Link>
            </div>
        </section>
    );
}

export default Hero;