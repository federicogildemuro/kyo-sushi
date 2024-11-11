import './Slider.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../../services/ProductsServices'
import sliderImage1 from '../../assets/slider-1.jpg'
import sliderImage2 from '../../assets/slider-2.jpg'
import sliderImage3 from '../../assets/slider-3.jpg'
import sliderImage4 from '../../assets/slider-4.jpg'
import sliderImage5 from '../../assets/slider-5.jpg'
import sliderImage6 from '../../assets/slider-6.jpg'
import sliderImage7 from '../../assets/slider-7.jpg'
import sliderImage8 from '../../assets/slider-8.jpg'
import sliderImage9 from '../../assets/slider-9.jpg'
import sliderImage10 from '../../assets/slider-10.jpg'

function Slider() {
    const sliderImages = [sliderImage1, sliderImage2, sliderImage3, sliderImage4, sliderImage5, sliderImage6, sliderImage7, sliderImage8, sliderImage9, sliderImage10]
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            <h1>Nuestros productos</h1>

            <div id="carouselExampleFade" className="carousel slide carousel-fade">
                <div className="carousel-inner">
                    {sliderImages.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <Link to={`/tienda/${categories[index]}`} className="text-decoration-none text-dark">
                                <img src={image} className="d-block w-100" alt="..." />
                                <div className="carousel-caption d-none d-md-block">
                                    <h2>{categories[index]}</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>

                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>
        </>

    )
}

export default Slider