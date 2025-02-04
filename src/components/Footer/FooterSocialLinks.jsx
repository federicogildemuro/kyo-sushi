import { Link } from 'react-router-dom';

function FooterSocialLinks() {
    const links = [
        { to: 'https://www.facebook.com', title: 'Facebook', icon: 'bi-facebook' },
        { to: 'https://www.instagram.com', title: 'Instagram', icon: 'bi-instagram' },
        { to: 'https://www.x.com', title: 'X', icon: 'bi-twitter-x' },
        { to: 'https://www.tiktok.com', title: 'TikTok', icon: 'bi-tiktok' },
        { to: 'https://youtube.com', title: 'YouTube', icon: 'bi-youtube' }
    ];

    return (
        <div className="d-flex flex-column align-items-center text-center gap-2">
            <h5>Síguenos en nuestras redes</h5>

            <ul className="d-flex gap-4 p-0">
                {links.map((link, index) => (
                    <li key={index}>
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

export default FooterSocialLinks;