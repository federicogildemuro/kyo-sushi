import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './AboutUs.css'

function AboutUs() {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: true
        });
    }, []);

    return (
        <section className="about-us-container d-flex flex-column text-center">
            <div className="container mb-3">
                <h1 className="display-6 fw-bold mb-3" data-aos="fade-down">
                    Sobre nosotros
                </h1>
                <div>
                    <p className="fs-5 fs-sm-6 fs-md-7 fs-lg-8 mb-3" data-aos="fade-up" data-aos-delay="200">
                        Somos <strong>Tefo</strong> y <strong>Braichu</strong>, dos amigos emprendedores de
                        <strong> Palma de Mallorca</strong> apasionados por la gastronomía y el arte culinario. Tras
                        años de experiencia trabajando en el mundo de la cocina, decidimos unir nuestras fuerzas y dar vida
                        a un proyecto que refleja nuestra dedicación y amor por la buena comida: <strong>Kyo Sushi</strong>.
                    </p>
                    <p className="fs-5 fs-sm-6 fs-md-7 fs-lg-8 mb-3" data-aos="fade-up" data-aos-delay="400">
                        Nuestro objetivo es llevar a tu mesa lo mejor de la cocina japonesa, con ingredientes frescos
                        y de la más alta calidad. En cada roll, sashimi y nigiri, ponemos toda nuestra creatividad y
                        conocimientos para ofrecerte una experiencia gastronómica única que combina tradición y un
                        toque de innovación.
                    </p>
                    <p className="fs-5 fs-sm-6 fs-md-7 fs-lg-8 mb-3" data-aos="fade-up" data-aos-delay="600">
                        En <strong>Kyo Sushi</strong>, creemos que la comida no solo alimenta, sino que también conecta
                        a las personas. Por eso, trabajamos día a día para que cada pedido sea una celebración de sabores,
                        frescura y autenticidad. Gracias por confiar en nosotros y permitirnos ser parte de tus momentos especiales. ¡Estamos
                        emocionados de compartir nuestra pasión contigo!
                    </p>
                </div>
            </div>
        </section>
    );
}

export default AboutUs