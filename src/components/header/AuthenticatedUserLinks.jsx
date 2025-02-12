import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { authenticatedUserLinks as links } from './links';

function AuthenticatedUserLinks() {
    const { user } = useAuth();

    if (!user) return null;

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

export default AuthenticatedUserLinks;