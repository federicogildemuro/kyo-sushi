import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="custom-footer py-4">
            <div className="container">
                <div className="row">

                    <div className="col-md-4 mb-3">
                        <h5>Legales</h5>

                        <Link href="#" className="footer-link d-block">Política de Privacidad</Link>

                        <Link href="#" className="footer-link d-block">Política de Cookies</Link>

                        <Link href="#" className="footer-link d-block">Términos y Condiciones</Link>
                    </div>

                    <div className="col-md-4 mb-3">
                        <h5>Síguenos en nuestras redes</h5>

                        <Link href="#" className="footer-link me-3" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1.18 8H8v5.5h-1.9V8h-1v-1.9h1V5.5c0-1.4.8-2.5 2.2-2.5h1.6v1.9h-1c-.4 0-.5.2-.5.5v1.2h1.6L9.18 8z" />
                            </svg> Facebook
                        </Link>

                        <Link href="#" className="footer-link me-3" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5c0 3.3-2.45 5.75-5.75 5.75h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm8.5 1.5h-8.5c-2.5 0-4.25 1.75-4.25 4.25v8.5c0 2.5 1.75 4.25 4.25 4.25h8.5c2.5 0 4.25-1.75 4.25-4.25v-8.5c0-2.5-1.75-4.25-4.25-4.25zM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5zm4.88-.6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
                            </svg> Instagram
                        </Link>
                    </div>

                    <div className="col-md-4 mb-3 text-md-end text-center">
                        <h5>&copy; {new Date().getFullYear()} Kyo Sushi</h5>

                        <p>Diseñado y desarrollado por Federico Gil de Muro para el curso de React JS de Coderhouse</p>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer