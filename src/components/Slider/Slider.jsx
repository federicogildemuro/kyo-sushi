import { Link } from 'react-router-dom';
import sliderImage1 from '../../assets/slider-1.jpg';
import sliderImage2 from '../../assets/slider-2.jpg';
import sliderImage3 from '../../assets/slider-3.jpg';
import sliderImage4 from '../../assets/slider-4.jpg';
import sliderImage5 from '../../assets/slider-5.jpg';
import sliderImage6 from '../../assets/slider-6.jpg';
import sliderImage7 from '../../assets/slider-7.jpg';
import sliderImage8 from '../../assets/slider-8.jpg';
import sliderImage9 from '../../assets/slider-9.jpg';
import sliderImage10 from '../../assets/slider-10.jpg';
import './Slider.css';

const sliderItems = [
    { title: 'Rolls', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: sliderImage1 },
    { title: 'Hot Rolls', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: sliderImage2 },
    { title: 'Sin alga y sin arroz', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: sliderImage3 },
    { title: 'Veggies', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: sliderImage4 },
    { title: 'Makis', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: sliderImage5 },
    { title: 'Sashimis', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: sliderImage6 },
    { title: 'Entrantes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: sliderImage7 },
    { title: 'Niguiris', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: sliderImage8 },
    { title: 'Salsas', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: sliderImage9 },
    { title: 'Combinados', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: sliderImage10 },
];

function Slider() {
    return (
        <>
            <h1>Nuestros productos</h1>

            <div id="carouselExampleFade" className="carousel slide carousel-fade">
                <div className="carousel-inner">
                    {sliderItems.map((item, index) => (
                        <div
                            key={item.title}
                            className={`carousel-item ${index === 0 ? 'active' : ''}`}
                        >
                            <Link
                                to={`/tienda/${item.title}`}
                                className="text-decoration-none text-dark"
                            >
                                <img
                                    src={item.image}
                                    className="d-block w-100"
                                    alt={`Categoría: ${item.title}`}
                                />
                                <div className="carousel-caption d-none d-md-block">
                                    <h2>{item.title}</h2>
                                    <p>{item.description}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                </button>

                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                </button>
            </div>
        </>
    );
};

export default Slider;