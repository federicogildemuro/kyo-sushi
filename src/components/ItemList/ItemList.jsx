import Item from '../Item/Item'
import './ItemList.css'

function ItemList({ items }) {

    if (!items) return null;

    return (
        <div className="container-fluid">
            <ul className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 m-3 mb-5">
                {items.map((item) => (
                    <Item key={item.id} item={item} />
                ))}
            </ul>
        </div>
    )
}

export default ItemList