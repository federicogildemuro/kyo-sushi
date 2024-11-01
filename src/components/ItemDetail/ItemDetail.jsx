import ItemCount from '../ItemCount/ItemCount'

function ItemDetail({ item }) {
    return (
        <div>
            <h1>Detalle del producto</h1>
            <h2>{item.title}</h2>
            <img src={item.pictureUrl} alt={item.title} />
            <p>{item.description}</p>
            <p>${item.price}</p>
            <p>{item.stock} unidades en stock</p>
            <ItemCount stock={item.stock} />
        </div>
    )
}

export default ItemDetail