import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import logoHover from '../../assets/logo-hover.png'
import './NavbarLogo.css'

function NavbarLogo() {
    const [imageSrc, setImageSrc] = useState(logo);

    const handleMouseEnter = () => setImageSrc(logoHover);
    const handleMouseLeave = () => setImageSrc(logo);

    return (
        <Link className="navbar-brand" to="/">
            <img
                src={imageSrc}
                alt="logo kyo-sushi"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
        </Link>
    )
}

export default NavbarLogo