import { Link } from 'react-router-dom'
import { scrollToTop } from '../../utils/ScrollUtils'
import './Item.css'

function Item({ item }) {

    if (!item) return null;

    return (
        <li className="col">
            <div className="item-container card h-100">
                <img src={item.pictureUrl} className="card-img-top" alt={item.title} />
                <div className="card-body d-flex flex-column justify-content-between align-items-center">
                    <p className="card-text">{item.category}</p>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">€{item.price.toFixed(2)}</p>
                    <Link
                        to={`/item/${item.id}`}
                        className="btn custom-btn w-auto"
                        onClick={scrollToTop}
                    >
                        Ver detalle
                    </Link>
                </div>
            </div>
        </li>
    )
}

export default Item