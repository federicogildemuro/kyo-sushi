import './Hero.css'
import { Link } from 'react-router-dom'

function Hero() {
    return (
        <section className="hero d-flex justify-content-center align-items-center text-center">
            <div className="bg-dark bg-opacity-50 p-4 rounded text-white">
                <h1 className="display-4 mb-3">¡Bienvenido a Kyo Sushi!</h1>

                <p className="lead mb-4">Descubre los sabores más frescos y auténticos, listos para tu deleite.</p>

                <Link to="/tienda" className="btn btn-primary btn-lg">Ir a la tienda</Link>
            </div>
        </section>
    )
}

export default Hero