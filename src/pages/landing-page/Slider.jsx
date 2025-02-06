import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import sliderItems from './sliderItems';
import { scrollToTop } from '../../utils/ScrollUtils';

function Slider() {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: true
        });
    }, []);

    return (
        <section>
            <h1
                className="display-6 fw-bold m-5 text-center"
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
                                    className="carousel-img"
                                    alt={`Imagen de la categoría ${item.title}`}
                                />

                                <div className="carousel-caption d-flex align-items-center justify-content-center text-center w-100 h-100 p-5">
                                    <div className="bg-dark bg-opacity-50 rounded p-4">
                                        <h1 className="display-6 fw-bold">{item.title}</h1>
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