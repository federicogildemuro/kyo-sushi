import Item from "../Item/Item"

function ItemList({ items }) {
    return (
        <ul>
            {items.map((item) => (
                <Item key={item.id} item={item} />
            ))}
        </ul>
    )
}

export default ItemList