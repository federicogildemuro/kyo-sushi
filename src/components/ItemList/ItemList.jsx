import './ItemList.css'
import Item from '../Item/Item'

function ItemList({ items }) {
    return (
        <div className="container-fluid">
            <ul className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {items.map((item) => (
                    <Item key={item.id} item={item} />
                ))}
            </ul>
        </div>
    )
}

export default ItemList