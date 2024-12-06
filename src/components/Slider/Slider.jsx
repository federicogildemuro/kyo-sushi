import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { scrollToTop } from '../../utils/ScrollUtils'
import sliderItems from './SliderItems'
import './Slider.css'

function Slider() {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: true
        });
    }, []);

    return (
        <div className="slider-container">
            <div className="slider-title-container d-flex align-items-center justify-content-center">
                <h1 className="slider-title fs-1 fs-sm-2 fs-md-3 fs-lg-4" data-aos="zoom-in">
                    Explora las distintas categorías de nuestro variado menú
                </h1>
            </div>

            <div id="carouselFade" className="carousel slide carousel-fade">
                <div className="carousel-inner">
                    {sliderItems.map((item, index) => (
                        <div
                            key={item.title}
                            className={`carousel-item custom-carousel-item ${index === 0 ? 'active' : ''}`}
                            aria-current={index === 0 ? 'true' : 'false'}
                        >
                            <Link to={`/tienda/${item.title}`} onClick={scrollToTop}>
                                <img
                                    src={item.image}
                                    alt={`Imagen de la categoría: ${item.title}`}
                                />
                                <div className="carousel-caption bg-dark bg-opacity-50 rounded custom-carousel-caption">
                                    <h2 className="fs-1 fs-sm-2 fs-md-3">{item.title}</h2>
                                    <p className="fs-4 fs-sm-5 fs-md-6">{item.description}</p>
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
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>

                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselFade"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    )
}

export default Slider