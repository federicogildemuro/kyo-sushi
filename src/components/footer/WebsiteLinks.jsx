import { Link } from 'react-router-dom';
import { websiteLinks as links } from './links';
import { scrollToTop } from '../../utils/scrollUtils';

function WebsiteLinks() {
    return (
        <div className="d-flex flex-column text-center text-md-start gap-3">
            <h5>Vínculos</h5>

            <ul className="d-flex flex-column gap-2 p-0">
                {links.map((link) => (
                    <li key={link.label}>
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

export default WebsiteLinks;