import useAuth from '../../hooks/useAuth';
import FooterLinks from './FooterLinks';
import FooterSocialLinks from './FooterSocialLinks';
import Copyright from './Copyright';
import './Footer.css';

function Footer() {
    const { isAdmin } = useAuth();

    if (isAdmin) return null;

    return (
        <footer className="footer-container row p-5 m-0">
            <div className="col-md-4 mb-5 mb-md-0">
                <FooterLinks />
            </div>

            <div className="col-md-4 mb-5 mb-md-0">
                <FooterSocialLinks />
            </div>

            <div className="col-md-4">
                <Copyright />
            </div>
        </footer>
    );
}

export default Footer;