import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import logoHover from '../../assets/logo-hover.png'
import { scrollToTop } from '../../utils/ScrollUtils'
import './NavBarLogo.css'

function NavBarLogo() {
    const [imageSrc, setImageSrc] = useState(logo);

    const handleMouseEnter = () => setImageSrc(logoHover);
    const handleMouseLeave = () => setImageSrc(logo);

    return (
        <Link to="/" className="navbar-brand" onClick={scrollToTop}>
            <img
                src={imageSrc}
                alt="logo kyo-sushi"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
        </Link>
    )
}

export default NavBarLogo