import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/ScrollUtils';
import './Footer.css';

function Footer() {
    const links = [
        { to: '/about-us', label: 'Sobre nosotros' },
        { to: '/contact', label: 'Contacto' },
        { to: '/terms', label: 'Términos y condiciones' }
    ];

    return (
        <footer className="custom-footer py-4">
            <div className="container">
                <div className="row text-center text-md-start">
                    <div className="col-md-4 mb-3">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                to={link.to}
                                className="footer-link d-block"
                                onClick={scrollToTop}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="col-md-4 mb-3 d-flex flex-column align-items-center">
                        <h5 className="text-center text-md-center">Síguenos en nuestras redes</h5>

                        <div className="d-flex flex-column flex-md-row align-items-center">
                            <Link
                                to="#"
                                className="footer-link me-md-3 mb-2 mb-md-0"
                                aria-label="Facebook"
                                onClick={scrollToTop}
                            >
                                <i className="bi bi-facebook me-2" />
                                Facebook
                            </Link>

                            <Link
                                to="https://www.instagram.com/kyosushipm?igsh=MXd1MGkxbDhyMW5uMw=="
                                className="footer-link mb-2 mb-md-0"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                onClick={scrollToTop}
                            >
                                <i className="bi bi-instagram me-2" />
                                Instagram
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3 text-md-end">
                        <h5>&copy; {new Date().getFullYear()} Kyo Sushi</h5>

                        <p>Diseñado y desarrollado por Federico Gil de Muro para el curso de React JS de Coderhouse</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;