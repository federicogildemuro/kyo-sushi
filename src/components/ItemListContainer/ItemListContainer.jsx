import ItemCount from "../ItemCount/ItemCount"

function ItemListContainer({ greeting }) {
    return (
        <>
            <h1>{greeting}</h1>
            <ItemCount />
        </>
    )
}

export default ItemListContainer