import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/ScrollUtils';

function FooterLinks() {
    const links = [
        { to: '/about-us', label: 'Sobre nosotros' },
        { to: '/contact', label: 'Contacto' },
        { to: '/terms', label: 'Términos y condiciones' }
    ];

    return (
        <div className="d-flex flex-column text-center text-md-start gap-2">
            <h5>Vínculos</h5>

            <ul className="d-flex flex-column text-center text-md-start gap-2 p-0">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link
                            to={link.to}
                            className="footer-link"
                            onClick={scrollToTop}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FooterLinks;