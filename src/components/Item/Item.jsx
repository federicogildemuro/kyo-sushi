import ItemCount from '../ItemCount/ItemCount'

function Item({ item }) {
    return (
        <div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>${item.price}</p>
            <p>{item.pictureUrl}</p>
            <ItemCount stock={item.stock} />
        </div>
    )
}

export default Item