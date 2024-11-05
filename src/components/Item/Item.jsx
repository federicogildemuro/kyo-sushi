import './Item.css'
import { NavLink } from 'react-router-dom'

function Item({ item }) {
    return (
        <li className="col">
            <div className="card h-100">
                <img src={item.pictureUrl} className="card-img-top" alt={item.title} />
                <div className="card-body">
                    <p className="card-text">{item.category}</p>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">€{item.price.toFixed(2)}</p>
                    <NavLink to={`/item/${item.id}`} className="btn btn-primary">Ver detalle</NavLink>
                </div>
            </div>
        </li>
    )
}

export default Item