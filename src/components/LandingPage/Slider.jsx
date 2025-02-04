import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { scrollToTop } from '../../utils/ScrollUtils';
import sliderImage1 from '../../assets/slider-1.jpg';
import sliderImage2 from '../../assets/slider-2.jpg';
import sliderImage3 from '../../assets/slider-3.jpg';
import sliderImage4 from '../../assets/slider-4.jpg';
import sliderImage5 from '../../assets/slider-5.jpg';

function Slider() {
    const sliderItems = [
        { title: 'Combinados', description: 'Combinados ideales para compartir.', image: sliderImage1 },
        { title: 'Rolls', description: 'Rolls clásicos y especiales.', image: sliderImage2 },
        { title: 'Hot Rolls', description: 'Rolls calientes para cualquier ocasión.', image: sliderImage3 },
        { title: 'Sin alga y sin arroz', description: 'Opciones sin alga y sin arroz.', image: sliderImage4 },
        { title: 'Veggies', description: 'Rolls para amantes de los vegetales.', image: sliderImage5 },
    ];

    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: true
        });
    }, []);

    return (
        <section>
            <h1
                className="text-center"
                data-aos="zoom-in"
            >
                Explora las distintas categorías de nuestro variado menú
            </h1>

            <div
                id="carouselFade"
                className="carousel slide carousel-fade"
            >
                <div className="carousel-inner">
                    {sliderItems.map((item, index) => (
                        <div
                            key={item.title}
                            className={`carousel-item custom-carousel-item ${index === 0 ? 'active' : ''}`}
                            aria-current={index === 0 ? 'true' : 'false'}
                        >
                            <Link
                                to={`/tienda/${item.title}`}
                                onClick={scrollToTop}
                            >
                                <img
                                    src={item.image}
                                    alt={`Imagen de la categoría ${item.title}`}
                                />

                                <div className="carousel-caption d-flex justify-content-center align-items-center text-center w-100 h-100 p-5">
                                    <div className="bg-dark bg-opacity-50 rounded p-3">
                                        <h2>{item.title}</h2>
                                        <p className="lead">{item.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselFade"
                    data-bs-slide="prev"
                >
                    <i className="carousel-icon bi bi-chevron-left bg-dark bg-opacity-50 rounded" />
                </button>

                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselFade"
                    data-bs-slide="next"
                >
                    <i className="carousel-icon bi bi-chevron-right bg-dark bg-opacity-50 rounded" />
                </button>
            </div>
        </section>
    );
}

export default Slider;