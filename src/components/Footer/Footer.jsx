import useAuth from '../../hooks/useAuth';
import WebsiteLinks from './WebsiteLinks';
import SocialLinks from './SocialLinks';
import Copyright from './Copyright';
import './Footer.css';

function Footer() {
    const { isAdmin } = useAuth();

    if (isAdmin) return null;

    return (
        <footer className="footer-container row w-100 p-5 m-0">
            <div className="col-md-4 mb-5 mb-md-0">
                <WebsiteLinks />
            </div>

            <div className="col-md-4 mb-5 mb-md-0">
                <SocialLinks />
            </div>

            <div className="col-md-4">
                <Copyright />
            </div>
        </footer>
    );
}

export default Footer;