import { Link } from 'react-router-dom';
import { authenticatedUserLinks as links } from './links';

function AuthenticatedUserNavLinks() {
    return (
        <>
            {links.map((link) => (
                <li key={link.label}>
                    <Link
                        to={link.to}
                        title={link.label}
                        className="nav-link"
                    >
                        <i className={`nav-bar-icon bi ${link.icon}`} />
                    </Link>
                </li>
            ))}
        </>
    );
}

export default AuthenticatedUserNavLinks;