import { Link } from 'react-router-dom';
import { socialLinks as links } from './links';

function SocialLinks() {
    return (
        <div className="d-flex flex-column align-items-center text-center gap-3">
            <h5>Síguenos en nuestras redes</h5>

            <ul className="d-flex gap-4 p-0">
                {links.map((link) => (
                    <li key={link.title}>
                        <Link
                            to={link.to}
                            title={link.title}
                            className="footer-link"
                            target="_blank"
                        >
                            <i className={`bi ${link.icon}`} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SocialLinks;