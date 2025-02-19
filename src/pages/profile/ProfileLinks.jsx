import { Link } from 'react-router-dom';
import { profileLinks as links } from './links';
import { scrollToTop } from '../../utils/scrollUtils';

function ProfileLinks() {
    return (
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
            {links.map((link, index) => (
                <Link
                    key={index}
                    to={link.to}
                    className="btn custom-btn"
                    onClick={scrollToTop}
                >
                    {link.text}
                    <i className={`bi ${link.icon} ms-2`} />
                </Link>
            ))}
        </div>
    );
}

export default ProfileLinks;