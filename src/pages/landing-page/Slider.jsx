import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { scrollToTop } from '../../utils/scrollUtils';
import sliderItems from './sliderItems';

function Slider() {
    const ref = useRef(null);
    const isInView = useInView(ref, { triggerOnce: true, margin: '-25%' });

    return (
        <section ref={ref}>
            <motion.h1
                className="display-6 fw-bold m-5 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: 'easeOut', type: 'spring', stiffness: 100 }}
            >
                Explora las distintas categorías de nuestro variado menú
            </motion.h1>

            <div
                id="carouselFade"
                className="carousel slide carousel-fade"
                aria-live="polite"
            >
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
                                    alt={`Imagen de la categoría ${item.title}`}
                                    className="carousel-img"
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
                    aria-label="Anterior"
                >
                    <i
                        className="carousel-icon bi bi-chevron-left bg-dark bg-opacity-50 rounded"
                        aria-hidden="true"
                    />
                </button>

                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselFade"
                    data-bs-slide="next"
                    aria-label="Siguiente"
                >
                    <i
                        className="carousel-icon bi bi-chevron-right bg-dark bg-opacity-50 rounded"
                        aria-hidden="true"
                    />
                </button>
            </div>
        </section>
    );
}

export default Slider;